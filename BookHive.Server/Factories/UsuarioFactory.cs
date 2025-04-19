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
                Pessoa = PessoaFactory.converterDtoParaModel(dto.Pessoa)
            };
        }

        public static UsuarioConsultaDto converterModelParaDto(Usuario usuario)
        {
            return new UsuarioConsultaDto(
                usuario.Id,
                usuario.NomeUsuario,
                usuario.Email,
                PessoaFactory.converterModelParaDto(usuario.Pessoa)
             );
        }
    }
}
