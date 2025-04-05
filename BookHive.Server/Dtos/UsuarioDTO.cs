using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record UsuarioDto(
        [Required] string NomeUsuario,
        [Required, EmailAddress] string Email,
        [Required, MinLength(6)] string Senha,
        [Required] PessoaDto Pessoa
    );
}
