
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using BookHive.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BookHive.Server.Repositories
{
    public class EmprestimoRepository : IEmprestimoRepository
    {
        private readonly AppDbContext _context;
        
        private readonly ILogger<EmprestimoRepository> _logger;
        
        public EmprestimoRepository(AppDbContext context, ILogger<EmprestimoRepository> logger) {
            _logger = logger;
            _context = context;
        }

        public IQueryable<Emprestimo> BuscarEmprestimosVinculadosAoLivro(int idLivro) {
            return _context.Emprestimo
                .Include(p => p.LivroEmprestado)
                .Where(p => p.LivroEmprestado.Id == idLivro);
        }

        public void CadastrarEmprestimo(Emprestimo emprestimo)
        {
            _context.Emprestimo.Add(emprestimo);
            _context.SaveChanges();
        }

        public void AtualizarEmprestimo(Emprestimo emprestimo) {
            _context.Emprestimo.Update(emprestimo);
            _context.SaveChanges();
        }
    }
}
