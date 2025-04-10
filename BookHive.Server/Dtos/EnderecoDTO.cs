using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record EnderecoDto(
        int Id,
        string Logradouro,
        string Numero,
        string Bairro,
        string Cidade,
        string Estado,
        string Cep
    );

}
