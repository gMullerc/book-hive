using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface IEmprestimoRepository
    {
        void CadastrarEmprestimo(Emprestimo emprestimo);
    }
}
