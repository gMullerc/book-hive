
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using BookHive.Server.Dtos;
using Microsoft.EntityFrameworkCore;

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

        public void AtualizarLivro(Livro livro)
        {
            _context.Livro.Update(livro);
            _context.Entry(livro.Situacao).State = EntityState.Modified; 
            _context.SaveChanges();
        }
        
        public Livro? BuscarPorIdLivro(int id)
        {
            return _context.Livro.Include(p => p.Situacao).FirstOrDefault(l => l.Id == id);
        }
        public Livro? BuscarPorIsbnLivro(string isbn)
        {
            return _context.Livro
                .Include(p => p.Situacao)
                .FirstOrDefault(p => p.Isbn == isbn);
        }
        public IQueryable<Livro> BuscarLivros()
        {
            return _context.Livro.Include(p => p.Situacao).AsQueryable();
        }

        public void Excluir(Livro livro)
        {
            _context.Livro.Remove(livro);
            _context.SaveChanges();
        }

    }
}
