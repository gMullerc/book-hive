namespace BookHive.Server.Exceptions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro capturado no middleware");

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = ex switch
                {
                    BadRequestException => StatusCodes.Status400BadRequest,
                    UnauthorizedException => StatusCodes.Status401Unauthorized,
                    _ => StatusCodes.Status500InternalServerError
                };

                var response = new
                {
                    mensagem = ex.Message,
                    horario = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
                };

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }

}
