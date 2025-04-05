using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class EnderecoFactory
    {
        public static Endereco Criar(EnderecoDto dto)
        {
            return new Endereco
            {
                Logradouro = dto.Logradouro,
                Numero = dto.Numero,
                Bairro = dto.Bairro,
                Cidade = dto.Cidade,
                Estado = dto.Estado,
                Cep = dto.Cep
            };
        }
    }
}
