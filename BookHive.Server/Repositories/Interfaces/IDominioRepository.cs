using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface IDominioRepository
    {
        Dominio? BuscarDominioPorCodigo(string codigoLivro);

    }
}
