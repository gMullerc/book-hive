
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;

namespace BookHive.Server.Repositories
{
    public class LivroRepository : ILivroRepository
    {
        private readonly AppDbContext _context;

        public LivroRepository(AppDbContext context)
        {
            _context = context;
        }

        public void CadastrarLivro(Livro livro)
        {
            _context.Livro.Add(livro);
            _context.SaveChanges();
        }
        public Livro BuscarPorIdLivro(int id)
        {
            return _context.Livro.Find(id);            
        }
    }
}
