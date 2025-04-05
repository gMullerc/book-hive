namespace BookHive.Server.Models
{
    public class Livro
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string? Autor { get; set; }
        public string? Editora { get; set; }
        public string? Isbn { get; set; }
        public int QuantidadeDisponivel { get; set; }
        public int QuantidadeTotal { get; set; }
        public DateTime? DataPublicacao { get; set; }
    }
}
