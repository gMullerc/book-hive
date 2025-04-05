using System.ComponentModel.DataAnnotations.Schema;

namespace BookHive.Server.Models
{

    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public string Rg { get; set; } = string.Empty;
        public Endereco Endereco { get; set; } = new Endereco();
    }
}
