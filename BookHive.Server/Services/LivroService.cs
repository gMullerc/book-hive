using BookHive.Server.Dtos;
using BookHive.Server.Factories;
using BookHive.Server.Models;
using BookHive.Server.Repositories.Interfaces;

namespace BookHive.Server.Services
{
    public interface ILivroService
    {
        void CadastrarLivro(LivroDto livroDto);
        LivroDto BuscarPorIdLivro(int id);
        PagedResultDto<LivroDto> BuscarLivros(PageDto pagination);

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

        public LivroDto BuscarPorIdLivro(int id) {
            var livro = _livroRepository.BuscarPorIdLivro(id);
            if (livro != null)
                return LivroFactory.converterModelParaDto(livro);
            else
                return new LivroDto(null, "","","","", DateOnly.MaxValue);
        }

        public  PagedResultDto<LivroDto> BuscarLivros(PageDto pagination)
        {
            IQueryable<Livro> livrosEncontrados = _livroRepository.BuscarLivros();

            int totalItems = livrosEncontrados.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pagination.PageSize);

            List<Livro> livros = livrosEncontrados
                .OrderBy(p => p.Id)
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToList();

            List<LivroDto> livroDtos = LivroFactory.converterListModelParaListDto(livros);

            return new PagedResultDto<LivroDto>(
                PageNumber: pagination.PageNumber,
                PageSize: pagination.PageSize,
                TotalItems: totalItems,
                TotalPages: totalPages,
                Items: livroDtos
            );
        }

    }
}
