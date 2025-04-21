
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BookHive.Server.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public Usuario CadastrarUsuario(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            _context.SaveChanges();

            return usuario;
        }
        public Usuario? FindByEmail(string email)
        {
            return _context.Usuario.FirstOrDefault(usuario => usuario.Email == email);
        }

        public Usuario? FindByNomeUsuario(string nomeUsuario)
        {
            return _context.Usuario.FirstOrDefault(usuario => usuario.NomeUsuario == nomeUsuario);
        }

        public Usuario? FindUsuarioById(int id)
        {
            return _context.Usuario
                .Include(p => p.Pessoa)
                .Include(p => p.Pessoa.Endereco)
                .Include(p => p.Pessoa.Contato)
                .FirstOrDefault(usuario => usuario.Id == id);
        }
    }
}
