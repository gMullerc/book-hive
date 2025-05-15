using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Models;
using BookHive.Server.Repositories;
using BookHive.Server.Repositories.Interfaces;

namespace BookHive.Server.Services {

    public interface IEmprestimoService {
        void Emprestar(int idLivro, string token);
        void Devolver(int idLivro, string token);
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

        public void Devolver(int idLivro, string token)
        {
            Livro livro = BuscarLivroPorId(idLivro);

            Usuario usuario = _usuarioService.BuscarUsuarioPorToken(token);

            List<Emprestimo> emprestimos = _emprestimoRepository.BuscarEmprestimosVinculadosAoLivro(idLivro).ToList();

            if (emprestimos.All(e => e.DataDevolucao != null)) {
                throw new BadRequestException("Não existem pendências com esse livro.");
            }
            
            Emprestimo emprestimoMaisProximo = emprestimos
                .Where(e => e.DataDevolucao == null)
                .OrderBy(e => Math.Abs((e.DataEmprestimo - DateTime.Now).Ticks))
                .First();
            
            if(!usuario.Id.Equals(emprestimoMaisProximo.Usuario.Id)){
                throw new BadRequestException("A devolução deve ser feita pelo mesmo usuário que cadastrou.");
            }

            emprestimoMaisProximo.DataDevolucao = DateTime.UtcNow;

            _emprestimoRepository.AtualizarEmprestimo(emprestimoMaisProximo); 

            Dominio dominio = BuscarSituacaoPorCodigo(SituacaoLivro.DISPONIVEL.ToString());

            livro.Situacao = dominio;

            _livroRepository.AtualizarLivro(livro);
        }



        public void Emprestar(int idLivro, string token)
        {
            Livro livro = BuscarLivroPorId(idLivro);

            VerificarSituacaoLivro(idLivro, livro);

            Usuario usuario = _usuarioService.BuscarUsuarioPorToken(token);

            Dominio dominio = BuscarSituacaoPorCodigo(SituacaoLivro.EMPRESTADO.ToString());

            livro.Situacao = dominio;

            _livroRepository.AtualizarLivro(livro);

            Emprestimo emprestimo = new Emprestimo
            {
                Usuario = usuario,
                LivroEmprestado = livro,
            };

            _emprestimoRepository.CadastrarEmprestimo(emprestimo);

        }

        private Dominio BuscarSituacaoPorCodigo(string situacaoLivro) {
            Dominio? dominio = _dominioRepository.BuscarDominioPorCodigo(situacaoLivro);

            if (dominio == null)
            {
                throw new BadHttpRequestException("Situação não encontrada");
            }

            return dominio;
        }

        private Livro BuscarLivroPorId(int idLivro) {
            Livro? livro = _livroRepository.BuscarPorIdLivro(idLivro);

            if (livro == null)
            {
                throw new BadRequestException("Livro não encontrado.");
            }

            return livro;
        }

        private void VerificarSituacaoLivro(int idLivro, Livro livro)
        {

            if (SituacaoLivro.EMPRESTADO.ToString().Equals(livro.Situacao.Codigo))
            {
                throw new BadRequestException("Livro se encontra emprestado.");
            }

            List<Emprestimo> emprestimos = _emprestimoRepository.BuscarEmprestimosVinculadosAoLivro(idLivro).ToList();

            if (emprestimos.Any(e => e.DataDevolucao == null))
            {
                throw new BadRequestException("Esse livro possui pendências, não pode ser alugado.");
            }
        }
    }
}