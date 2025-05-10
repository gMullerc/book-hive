using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class LivroFactory
    {
        public static Livro converterCadastroLivroDtoParaModel(CadastroLivroDto dto, string caminhoImagem, string? nomeImagem, Dominio situacaoLivro)
        {
            return new Livro
            {
                Titulo = dto.Titulo,
                Autor = dto.Autor,
                Editora = dto.Editora,
                Isbn = dto.Isbn,
                DataPublicacao = dto.DataPublicacao,
                CaminhoImagem = caminhoImagem,
                NomeImagem = nomeImagem,
                Situacao = situacaoLivro,
            };
        }

        public static ListagemLivroDTO converterModelParaListagemLivroDto(Livro model)
        {
            return new ListagemLivroDTO(model.Id, model.Titulo, model.Autor, model.Editora, model.Isbn, model.DataPublicacao, model.CaminhoImagem, DominioFactory.converterModelParaDto(model.Situacao) ,model?.NomeImagem);
        }

        public static List<ListagemLivroDTO> converterListModelParaListListagemLivroDto(List<Livro> livros)
        {
            return livros.Select(converterModelParaListagemLivroDto).ToList();
        }
    }
}
