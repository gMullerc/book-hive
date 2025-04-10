using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record PessoaDto(
        int? Id,
        [Required, MaxLength(30)] string Nome,
        [Required, MinLength(11)] string Cpf,
        [MinLength(9)] string Rg,
        [Required] EnderecoDto Endereco,
        [Required] ContatoDto Contato
    );

}
