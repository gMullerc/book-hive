using BookHive.Server.Dtos;
using BookHive.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivroController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivroController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpPost("cadastrar")]
        public IActionResult CadastrarLivro([FromBody] LivroDto livroDto) { 
            _livroService.CadastrarLivro(livroDto);
            return Ok();
            
        }

        [HttpPost("BuscarPorId")]
        public LivroDto BuscarPorIdLivro([FromQuery] int id) { 
            var livro = _livroService.BuscarPorIdLivro(id);
            return livro;
        }

    }
}
