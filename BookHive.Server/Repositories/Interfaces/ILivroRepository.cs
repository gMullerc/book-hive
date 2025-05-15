using BookHive.Server.Dtos;
using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface ILivroRepository
    {
        void CadastrarLivro(Livro livro);
        void AtualizarLivro(Livro livro);
        Livro BuscarPorIdLivro(int id);
        Livro? BuscarPorIsbnLivro(string isbn);
        IQueryable<Livro> BuscarLivros();
        void Excluir(Livro livro);

    }
}
