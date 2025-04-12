using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public class UsuarioLogadoDTO
    {
        public int Id { get; set; }
        public required string NomeUsuario { get; set; }
        public required string Email { get; set; }
        public DateTime AutenticadoEm { get; set; }
    }
}
