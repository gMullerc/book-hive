using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record UsuarioConsultaDto(
        [Required] string NomeUsuario,
        [Required, EmailAddress] string Email,
        [Required] PessoaDto Pessoa
    );
}
