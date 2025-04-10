using System.ComponentModel.DataAnnotations.Schema;

namespace BookHive.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public required string NomeUsuario { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public required string Senha { get; set; } = string.Empty;
        public required Pessoa Pessoa { get; set; }
    }
}
