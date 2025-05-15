using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface IEmprestimoRepository
    {
        void CadastrarEmprestimo(Emprestimo emprestimo);
        void AtualizarEmprestimo(Emprestimo emprestimo);
        IQueryable<Emprestimo> BuscarEmprestimosVinculadosAoLivro(int idLivro);
    }
}
