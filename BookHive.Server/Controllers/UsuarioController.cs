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

        [HttpPost("cadastrar")]
        public IActionResult CadastrarUsuario(UsuarioDto usuarioDto) {
            return Ok(_usuarioService.CadastrarUsuario(usuarioDto));
        }

        [HttpGet("{id}")]
        public IActionResult BuscarUsuarioPorId([FromRoute] int id) {
            return Ok(_usuarioService.BuscarUsuarioPorId(id));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO usuarioDto) {
            return Ok(_usuarioService.ValidarLogin(usuarioDto));
        }
    }
}
