
using BookHive.Server.Repositories.Interfaces;
using BookHive.Server.Controllers;
using BookHive.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BookHive.Server.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly AppDbContext _context;

        public PessoaRepository(AppDbContext context)
        {
            _context = context;
        }

        public Pessoa AtualizarDadosCadastrais(Pessoa pessoa)
        {
            _context.Pessoa.Update(pessoa);
            _context.Entry(pessoa.Endereco).State = EntityState.Modified;

            _context.SaveChanges();
            return pessoa;
        }

        public Pessoa? BuscarPessoaPorCpf(string cpf)
        {
            return _context.Pessoa
             .Include(p => p.Endereco)
             .FirstOrDefault(p => p.Cpf == cpf);
        }

        public Pessoa? BuscarPessoaPorId(int id)
        {
            return _context.Pessoa
                .Include(p => p.Endereco)
                .Include(p => p.Contato)
                .FirstOrDefault(p => p.Id == id);
        }


    }
}
