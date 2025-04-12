using BookHive.Server.Controllers;
using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Factories;
using BookHive.Server.Models;
using BookHive.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Services
{
    public interface IPessoaService {
        AtualizacaoCadastralPessoaDto AtualizarDadosCadastrais(AtualizacaoCadastralPessoaDto pessoaDto);
    }

    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoaService(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        public AtualizacaoCadastralPessoaDto AtualizarDadosCadastrais(AtualizacaoCadastralPessoaDto pessoaDto)
        {
            Pessoa? pessoa = _pessoaRepository.BuscarPessoaPorId(pessoaDto.Id);

            if (pessoa is not Pessoa pessoaEncontrada)
                throw new BadRequestException("Pessoa n�o encontrada.");

            AtualizarPessoaComDto(pessoa, pessoaDto);

            _pessoaRepository.AtualizarDadosCadastrais(pessoaEncontrada);

            return pessoaDto;

        }

        private void AtualizarPessoaComDto(Pessoa pessoa, AtualizacaoCadastralPessoaDto dto)
        {
            pessoa.Nome = dto.Nome;

            if (pessoa.Endereco is not null && dto.Endereco is not null)
            {
                Endereco endereco = pessoa.Endereco;
                EnderecoDto enderecoDto = dto.Endereco;

                endereco.Logradouro = enderecoDto.Logradouro;
                endereco.Numero = enderecoDto.Numero;
                endereco.Bairro = enderecoDto.Bairro;
                endereco.Cidade = enderecoDto.Cidade;
                endereco.Estado = enderecoDto.Estado;
                endereco.Cep = enderecoDto.Cep;
            }

            if (pessoa.Contato != null && dto.Contato != null)
            {
                Contato contato = pessoa.Contato;
                ContatoDto contatoDto = dto.Contato;

                contato.Telefone = contatoDto.Telefone;
                contato.Celular = contatoDto.Celular;
                contato.Email = contatoDto.Email;
            }
        }
    }
}
