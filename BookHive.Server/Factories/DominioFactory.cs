using BookHive.Server.Models;
using BookHive.Server.Dtos;

namespace BookHive.Server.Factories
{
    public static class DominioFactory
    {
        public static Dominio converterDtoParaModel(DominioDto dto)
        {
            return new Dominio
            {
                Id = dto.Id, 
                Descricao = dto.Descricao,
                Codigo = dto.Codigo
            };
        }

        public static DominioDto converterModelParaDto(Dominio model)
        {
            return new DominioDto( 
                model.Id, 
                model.Codigo,
                model.Descricao
            );
        }
    }
}
