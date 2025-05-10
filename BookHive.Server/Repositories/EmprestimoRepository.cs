
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Repositories
{
    public class EmprestimoRepository : IEmprestimoRepository
    {
        private readonly AppDbContext _context;
        
        public EmprestimoRepository(AppDbContext context) {
            _context = context;
        }

        public void CadastrarEmprestimo(Emprestimo emprestimo)
        {
            _context.Emprestimo.Add(emprestimo);
            _context.SaveChanges();
        }
    }
}
