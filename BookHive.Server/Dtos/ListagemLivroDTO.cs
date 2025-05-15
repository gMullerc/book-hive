using System.ComponentModel.DataAnnotations;
using BookHive.Server.Models;

namespace BookHive.Server.Dtos
{
    public record ListagemLivroDTO(
        int? Id,
        [Required] string Titulo,
        [Required] string Autor,
        [Required] string Editora,
        [Required] string Isbn,
        [Required] DateOnly DataPublicacao,
        [Required] string CaminhoImagem,
        [Required] DominioDto SituacaoLivro,
        string? NomeImagem
        );
}