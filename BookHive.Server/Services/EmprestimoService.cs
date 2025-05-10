using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Models;
using BookHive.Server.Repositories;
using BookHive.Server.Repositories.Interfaces;

namespace BookHive.Server.Services {

    public interface IEmprestimoService {
        void Emprestar(int idLivro, string token);
    }

    public class EmprestimoService : IEmprestimoService {

        private readonly ILivroRepository _livroRepository;
        private readonly IUsuarioService _usuarioService;
        private readonly IDominioRepository _dominioRepository;
        
        private readonly IEmprestimoRepository _emprestimoRepository;

        public EmprestimoService(
            ILivroRepository livroRepository, 
            IUsuarioService usuarioService, 
            IDominioRepository dominioRepository,
            IEmprestimoRepository emprestimoRepository
        ) {
            _livroRepository = livroRepository;
            _usuarioService = usuarioService;
            _dominioRepository = dominioRepository;
            _emprestimoRepository = emprestimoRepository;
        }

        public void Emprestar(int idLivro, string token) {
            Livro? livro = _livroRepository.BuscarPorIdLivro(idLivro);

            if (livro == null) {
                throw new BadRequestException("Livro não encontrado.");
            }

            if(SituacaoLivro.EMPRESTADO.ToString().Equals(livro.Situacao.Codigo)) {
                throw new BadRequestException("Livro se encontra emprestado.");
            }

            Usuario usuario = _usuarioService.BuscarUsuarioPorToken(token);

            Dominio? dominio = _dominioRepository.BuscarDominioPorCodigo(SituacaoLivro.EMPRESTADO.ToString());

            if(dominio == null) {
                throw new BadHttpRequestException("Situação não encontrada");
            }

            livro.Situacao = dominio;

            _livroRepository.AtualizarLivro(livro);

            Emprestimo emprestimo = new Emprestimo {
                Usuario = usuario,                
                LivroEmprestado = livro,          
            };

            _emprestimoRepository.CadastrarEmprestimo(emprestimo);

        }
    }
}