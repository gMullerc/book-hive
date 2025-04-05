using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public record EnderecoDto(
        string Logradouro,
        string Numero,
        string Bairro,
        string Cidade,
        string Estado,
        string Cep
    );

}
