
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Repositories
{
    public class DominioRepository : IDominioRepository
    {
        private readonly AppDbContext _context;
        
        public DominioRepository(AppDbContext context) {
            _context = context;
        }

        public Dominio? BuscarDominioPorCodigo(string codigoLivro)
        {
            return _context.Dominio
                .FirstOrDefault(p => p.Codigo == codigoLivro);
        }
    }
}
