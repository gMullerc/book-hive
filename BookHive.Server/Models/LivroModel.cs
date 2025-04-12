namespace BookHive.Server.Models
{
    public class Livro
    {
        public int Id { get; set; }
        public required string Titulo { get; set; }
        public required string Autor { get; set; }
        public required string Editora { get; set; }
        public required string Isbn { get; set; }
        public required DateOnly DataPublicacao { get; set; }
    }
}
