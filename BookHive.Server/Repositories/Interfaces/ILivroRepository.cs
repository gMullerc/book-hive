using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface ILivroRepository
    {
        void CadastrarLivro(Livro livro);
    }
}
