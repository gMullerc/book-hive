using BookHive.Server.Dtos;
using BookHive.Server.Factories;
using BookHive.Server.Models;
using BookHive.Server.Repositories.Interfaces;

namespace BookHive.Server.Services
{
    public interface ILivroService
    {
        void CadastrarLivro(LivroDto livroDto);
    }

    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _livroRepository;

        public LivroService(ILivroRepository livroRepository)
        {
            _livroRepository = livroRepository;
        }

        public void CadastrarLivro(LivroDto livroDto) {
            Livro livro = LivroFactory.converterDtoParaModel(livroDto);
            _livroRepository.CadastrarLivro(livro);
        }
    }
}
