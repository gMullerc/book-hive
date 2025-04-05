using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record LoginDTO(
        [Required, EmailAddress] string Email,
        [Required] string Senha
    );
}
