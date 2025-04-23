using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos {
    public record CadastroImagemDTO(
        [Required] string nomeImagem,
        [Required] string extensaoImagem,
        [Required] string imageBase64
    );
}