using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record PessoaDto(
        [Required, MaxLength(30)] string Nome,
        [Required, MinLength(11)] string Cpf,
        [MinLength(9)] string Rg,
        EnderecoDto Endereco
    );

}
