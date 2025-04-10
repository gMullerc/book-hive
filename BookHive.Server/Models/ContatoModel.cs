using System.ComponentModel.DataAnnotations.Schema;

namespace BookHive.Server.Models
{
    public class Contato
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public string? Telefone { get; set; }
        public required string Celular { get; set; }
    }
}
