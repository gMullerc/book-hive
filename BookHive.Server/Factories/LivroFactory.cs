using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class LivroFactory
    {
        public static Livro converterDtoParaModel(LivroDto dto)
        {
            return new Livro
            {
                Titulo = dto.Titulo,
                Autor = dto.Autor,
                Editora = dto.Editora,
                Isbn = dto.Isbn,
                DataPublicacao = dto.DataPublicacao
            };
        }

    }
}
