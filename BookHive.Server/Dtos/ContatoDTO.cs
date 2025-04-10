

using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record ContatoDto(
        int Id,
        [MinLength(10), MaxLength(10)] string? Telefone,
        [Required, MinLength(11), MaxLength(11)] string Celular,
        [Required, EmailAddress, MaxLength(255)] string Email
    );

}
