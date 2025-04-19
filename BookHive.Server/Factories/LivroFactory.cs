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

        public static LivroDto converterModelParaDto(Livro model)
        {
            return new LivroDto(model.Id, model.Titulo, model.Autor, model.Editora, model.Isbn, model.DataPublicacao);
        }

        public static List<LivroDto> converterListModelParaListDto(List<Livro> livros)
        {
            return livros.Select(converterModelParaDto).ToList();
        }
    }
}
