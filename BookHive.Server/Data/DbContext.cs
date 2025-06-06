using BookHive.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BookHive.Server.Controllers
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Endereco> Endereco { get; set; }
        public DbSet<Emprestimo> Emprestimo { get; set; }
        public DbSet<Dominio> Dominio { get; set; }
        public DbSet<Livro> Livro { get; set; }
    }
}
