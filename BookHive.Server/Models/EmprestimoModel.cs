namespace BookHive.Server.Models
{
    public class Emprestimo
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataEmprestimo { get; set; } = DateTime.Now;
        public DateTime? DataDevolucao { get; set; }
        public required Usuario Usuario { get; set; }
        public required Livro LivroEmprestado { get; set; }
    }
}
