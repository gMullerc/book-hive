using System.ComponentModel.DataAnnotations;

namespace BookHive.Server.Dtos
{
    public class UsuarioLogadoDTO
    {
        public int Id { get; set; }
        public string NomeUsuario { get; set; }
        public string Email { get; set; }
        public DateTime AutenticadoEm { get; set; }
    }
}
