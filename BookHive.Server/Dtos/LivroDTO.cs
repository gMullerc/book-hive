

using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record LivroDto(
         [Required] string Titulo,
         [Required] string Autor,
         [Required] string Editora,
         [Required] string Isbn,
         [Required] DateOnly DataPublicacao
    );

}

