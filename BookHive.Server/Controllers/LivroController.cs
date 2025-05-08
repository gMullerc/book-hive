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
        public async Task<IActionResult> CadastrarLivro([FromBody] CadastroLivroDto livroDto)
        {
            await _livroService.CadastrarLivro(livroDto);
            return Ok();
        }


        [HttpGet("BuscarPorId")]
        public ListagemLivroDTO BuscarPorIdLivro([FromQuery] int id)
        {
            var livro = _livroService.BuscarPorIdLivro(id);
            return livro;
        }

        [HttpGet]
        public IActionResult BuscarLivros([FromQuery] PageDto pagination)
        {
            return Ok(_livroService.BuscarLivros(pagination));
        }

        [HttpDelete("Excluir")]
        public IActionResult Excluir([FromQuery] int id)
        {
            _livroService.Excluir(id);
            return Ok();
        }

    }
}
