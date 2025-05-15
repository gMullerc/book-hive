using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Factories;
using BookHive.Server.Infra.Client.Interfaces;
using BookHive.Server.Models;
using BookHive.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookHive.Server.Services
{
    public interface ILivroService
    {
        Task CadastrarLivro(CadastroLivroDto livroDto);
        Task AtualizarLivro(CadastroLivroDto livroDto);
        ListagemLivroDTO BuscarPorIdLivro(int id);
        PagedResultDto<ListagemLivroDTO> BuscarLivros(PageDto pagination);

    }

    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _livroRepository;

        private readonly IBucketClient _bucketClient;

        public LivroService(ILivroRepository livroRepository, IBucketClient bucketClient)
        {
            _bucketClient = bucketClient;
            _livroRepository = livroRepository;
        }

        public async Task CadastrarLivro(CadastroLivroDto livroDto)
        {
            Livro? livroEncontrado = _livroRepository.BuscarPorIsbnLivro(livroDto.Isbn);

            if (livroEncontrado != null)
            {
                throw new BadRequestException("Livro já cadastrado com esse ISBN");
            }

            string caminhoImagem = await SalvarImagem(livroDto);

            Livro livro = LivroFactory.converterCadastroLivroDtoParaModel(livroDto, caminhoImagem, livroDto?.imagem?.nomeImagem);

            _livroRepository.CadastrarLivro(livro);
        }

        public async Task AtualizarLivro(CadastroLivroDto livroDto)
        {
            Livro? l = _livroRepository.BuscarPorIdLivro(livroDto.Id.Value);

            if (l == null)
                throw new BadRequestException("Livro não encontrado");

            
            l.Titulo = livroDto.Titulo;
            l.Autor = livroDto.Autor;
            l.Editora = livroDto.Editora;
            l.Isbn = livroDto.Isbn;
            l.DataPublicacao = livroDto.DataPublicacao;

            
            if (livroDto.imagem is not null && livroDto.imagem.nomeImagem != l.NomeImagem)
            {
                l.CaminhoImagem = await SalvarImagem(livroDto);
                l.NomeImagem = livroDto.imagem.nomeImagem;
            }

            
            _livroRepository.AtualizarLivro(l);


        }


        private async Task<string> SalvarImagem(CadastroLivroDto livroDto)
        {
            try
            {
                Guid myuuid = Guid.NewGuid();
                string myuuidAsString = myuuid.ToString();

                return await _bucketClient.UploadImagem(livroDto.imagem, myuuidAsString);
            }
            catch (Exception ex)
            {
                throw new BadRequestException("Ocorreu um erro ao salvar a imagem: []" + ex);
            }
        }


        public ListagemLivroDTO BuscarPorIdLivro(int id)
        {
            var livro = _livroRepository.BuscarPorIdLivro(id);

            if (livro == null) {
                throw new BadRequestException("Livro não encontrado");
            }

            return LivroFactory.converterModelParaListagemLivroDto(livro);

        }

        public PagedResultDto<ListagemLivroDTO> BuscarLivros(PageDto pagination)
        {
            IQueryable<Livro> livrosEncontrados = _livroRepository.BuscarLivros();

            int totalItems = livrosEncontrados.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pagination.PageSize);

            List<Livro> livros = livrosEncontrados
                .OrderBy(p => p.Id)
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToList();

            List<ListagemLivroDTO> livroDtos = LivroFactory.converterListModelParaListListagemLivroDto(livros);

            return new PagedResultDto<ListagemLivroDTO>(
                PageNumber: pagination.PageNumber,
                PageSize: pagination.PageSize,
                TotalItems: totalItems,
                TotalPages: totalPages,
                Items: livroDtos
            );
        }

    }
}
