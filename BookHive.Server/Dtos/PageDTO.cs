using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
       public record PageDto(
        [Range(1, int.MaxValue, ErrorMessage = "PageSize deve ser maior que 0.")] int PageSize = 10,
        [Range(1, int.MaxValue, ErrorMessage = "PageNumber deve ser maior que 0.")] int PageNumber = 1
    );
}