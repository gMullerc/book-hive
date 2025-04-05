using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class UsuarioFactory
    {
        public static Usuario converterDtoParaModel(UsuarioDto dto)
        {
            return new Usuario
            {
                NomeUsuario = dto.NomeUsuario,
                Email = dto.Email,
                Senha = dto.Senha,
                Pessoa = PessoaFactory.Criar(dto.Pessoa)
            };
        }
    }
}
