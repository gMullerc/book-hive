using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class ContatoFactory
    {
        public static Contato converterDtoParaModel(ContatoDto dto)
        {
            return new Contato
            {
                Telefone = dto.Telefone,
                Celular = dto.Celular,
                Email = dto.Email
            };
        }

        public static ContatoDto converterModelParaDto(Contato contato)
        {
            return new ContatoDto( 
                contato.Id,
                contato.Telefone,
                contato.Celular,
                contato.Email
            );

        }
    }
}
