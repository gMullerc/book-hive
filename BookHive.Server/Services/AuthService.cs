
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookHive.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace BookHive.Server.Services
{
    public interface IAuthService
    {
        public string GerarJwtToken(Usuario usuario);
    }

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GerarJwtToken(Usuario usuario)
        {
            var issuer = _configuration["JwtSettings:Issuer"];
            var audience = _configuration["JwtSettings:Audience"];
            var secretKey = _configuration["JwtSettings:SecretKey"];
            var claims = new[] {
                new Claim(SecurityClaimTypes.NameId, usuario.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
