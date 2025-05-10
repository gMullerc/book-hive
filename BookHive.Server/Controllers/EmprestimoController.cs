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

            string? authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();

            var token = authorizationHeader!.Replace("Bearer ", "");

            _emprestimoService.Emprestar(idLivro, token);
            return NoContent();
        }
    }
}