using System.ComponentModel.DataAnnotations;
using BookHive.Server.Models;

namespace BookHive.Server.Dtos
{
    public record DominioDto(
        [Required] int Id,
        [Required] string Codigo,
        [Required] string Descricao
        );
}