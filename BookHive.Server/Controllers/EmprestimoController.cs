using BookHive.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class EmprestimoController : ControllerBase{  
        private readonly IEmprestimoService _emprestimoService;

        public EmprestimoController(IEmprestimoService emprestimoService) {
            _emprestimoService = emprestimoService;
        }

        [HttpPost("emprestar/{idLivro}")]
        public IActionResult Emprestar([FromRoute] int idLivro) {

            string token = RecuperarToken();

            _emprestimoService.Emprestar(idLivro, token);
            return NoContent();
        }

        [HttpPut("devolver/{idLivro}")]
        public IActionResult Devolver([FromRoute] int idLivro)
        {
            string token = RecuperarToken();

            _emprestimoService.Devolver(idLivro, token);
            return NoContent();
        }

        private string RecuperarToken() {
            string? authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();

            var token = authorizationHeader!.Replace("Bearer ", "");
            return token;
        }
    }
}