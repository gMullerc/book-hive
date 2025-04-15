using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{

    public record AtualizacaoCadastralPessoaDto(
        [Required] int Id, 
        [Required] string Nome,
        [Required] EnderecoDto Endereco, 
        [Required] ContatoDto Contato
     );

}
