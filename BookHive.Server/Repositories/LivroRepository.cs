
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using BookHive.Server.Dtos;

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
            _context.SaveChanges();

            //return livro;
        }

        public Livro BuscarPorIdLivro(int id)
        {
            return _context.Livro.Find(id);
        }
        public Livro? BuscarPorIsbnLivro(string isbn)
        {
            return _context.Livro
                .FirstOrDefault(p => p.Isbn == isbn);
        }
        public IQueryable<Livro> BuscarLivros()
        {
            return _context.Livro.AsQueryable();
        }

    }
}
