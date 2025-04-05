using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class PessoaFactory
    {
        public static Pessoa Criar(PessoaDto dto)
        {
            return new Pessoa
            {
                Nome = dto.Nome,
                Cpf = dto.Cpf,
                Rg = dto.Rg,
                Endereco = EnderecoFactory.Criar(dto.Endereco)
            };
        }
    }
}
