using BookHive.Server.Models;

namespace BookHive.Server.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        int CadastrarUsuario(Usuario usuario);
        Usuario? FindByEmail(string email);
        Usuario? FindByNomeUsuario(string nomeUsuario);
    }
}
