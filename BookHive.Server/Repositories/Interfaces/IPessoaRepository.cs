using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface IPessoaRepository
    {
        Pessoa AtualizarDadosCadastrais(Pessoa pessoa);
        Pessoa? BuscarPessoaPorId(int id);
        Pessoa? BuscarPessoaPorCpf(string cpf);

    }
}
