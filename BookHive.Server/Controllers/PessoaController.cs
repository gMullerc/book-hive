using BookHive.Server.Dtos;
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpPut("atualizar")]
        public IActionResult AtualizarDadosCadastrais([FromBody] AtualizacaoCadastralPessoaDto pessoaDto) { 
            return Ok(_pessoaService.AtualizarDadosCadastrais(pessoaDto));
        }

    }
}
