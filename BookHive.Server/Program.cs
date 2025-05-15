using System.Text;
using BookHive.Server.Controllers;
using BookHive.Server.Exceptions;
using BookHive.Server.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

string? chave = builder.Configuration["JwtSettings:SecretKey"];
string? issuer = builder.Configuration["JwtSettings:Issuer"];
string? audience = builder.Configuration["JwtSettings:Audience"];

if (string.IsNullOrEmpty(chave) && string.IsNullOrEmpty(issuer) && string.IsNullOrEmpty(audience))
{
    throw new Exception("JKT nao configurado corretamente!");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chave!))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddControllers(options =>
{
    options.Filters.Add(new AuthorizeFilter());
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowBookHiveClient", policy =>
    {
        policy.WithOrigins("https://bookhive-client-142395531834.us-central1.run.app") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
builder.Services.AddServicesByConvention(typeof(Program).Assembly);
builder.Services.AddRepositoriesByConvention(typeof(Program).Assembly);
builder.Services.AddClientsByConvention(typeof(Program).Assembly);
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowBookHiveClient");
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();

// Open the default browser to the front
//System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
//{
//    FileName = "http://localhost:5000",
//    UseShellExecute = true
//});
