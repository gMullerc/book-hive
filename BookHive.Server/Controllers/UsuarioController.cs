using BookHive.Server.Dtos;
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("cadastro")]
        public IActionResult cadastrarUsuario(UsuarioDto usuarioDto) {

            int idRetornado = _usuarioService.CadastrarUsuario(usuarioDto);

            return Ok(new{
                mensagem = "Usuário cadastrado com sucesso",
                dataHora = DateTime.UtcNow
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO usuarioDto)
        {
            var usuarioLogado = _usuarioService.ValidarLogin(usuarioDto);
            return Ok(usuarioLogado);
        }
    }
}
