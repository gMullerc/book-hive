using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class PessoaFactory
    {
        public static Pessoa converterDtoParaModel(PessoaDto dto)
        {
            return new Pessoa
            {
                Nome = dto.Nome,
                Cpf = dto.Cpf,
                Rg = dto.Rg,
                Endereco = EnderecoFactory.converterDtoParaModel(dto.Endereco),
                Contato = ContatoFactory.converterDtoParaModel(dto.Contato)
            };
        }

        public static PessoaDto converterModelParaDto(Pessoa pessoa)
        {
            return new PessoaDto(
                pessoa.Id,
                pessoa.Nome,
                pessoa.Cpf,
                pessoa.Rg,
                EnderecoFactory.converterModelParaDto(pessoa.Endereco),
                ContatoFactory.converterModelParaDto(pessoa.Contato)
            );
        }
    }
}
