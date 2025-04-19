using BookHive.Server.Dtos;
using BookHive.Server.Services;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        [HttpPost("cadastrar")]
        public IActionResult CadastrarUsuario(UsuarioDto usuarioDto)
        {
            return Ok(new { token = _usuarioService.CadastrarUsuario(usuarioDto) });
        }

        [HttpGet()]
        [Authorize]
        public IActionResult BuscarUsuarioPorId()
        {
            return Ok(_usuarioService.BuscarUsuarioLogado(User.FindFirst(SecurityClaimTypes.NameId)?.Value));
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginDTO usuarioDto)
        {
            return Ok(new { token = _usuarioService.ValidarLogin(usuarioDto) });
        }
    }
}
