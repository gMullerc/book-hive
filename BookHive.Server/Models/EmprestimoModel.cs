namespace BookHive.Server.Models
{
    public class Emprestimo
    {
        public int Id { get; set; }
        public required Usuario Usuario { get; set; }
        public required Livro LivroEmprestado { get; set; }
        public DateTime DataEmprestimo { get; set; } = DateTime.UtcNow;
        public DateTime DataPrevistaDevolucao { get; set; } = DateTime.UtcNow.AddDays(7);
        public DateTime? DataDevolucao { get; set; }
    }
}
