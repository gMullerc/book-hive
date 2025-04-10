using BookHive.Server.Controllers;
using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Factories;
using BookHive.Server.Models;
using BookHive.Server.Repositories;
using BookHive.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookHive.Server.Services
{
    public interface IUsuarioService {
        public int CadastrarUsuario(UsuarioDto usuarioDTO);
        public UsuarioConsultaDto BuscarUsuarioPorId(int id);

        public UsuarioLogadoDTO ValidarLogin(LoginDTO usuarioDto);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IPessoaRepository _pessoaRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository, IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
            _usuarioRepository = usuarioRepository;
        }

        public UsuarioConsultaDto BuscarUsuarioPorId(int id)
        {
            Usuario? usuario = _usuarioRepository.FindUsuarioById(id);

            if(usuario == null) throw new BadRequestException("Usuário não encontrado.");


            return UsuarioFactory.converterModelParaDto(usuario);

        }

        public int CadastrarUsuario(UsuarioDto usuarioDTO)
        {
            Usuario? usuario = _usuarioRepository.FindByNomeUsuario(usuarioDTO.NomeUsuario);

            if (usuario != null)
            {
                throw new BadRequestException("Nome de usuário ja utilizado.");
            }

            usuario = _usuarioRepository.FindByEmail(usuarioDTO.Email);

            if (usuario != null)
            {
                throw new BadRequestException("E-mail ja utilizado.");
            }

            Pessoa? pessoa = _pessoaRepository.BuscarPessoaPorCpf(usuarioDTO.Pessoa.Cpf);

            if (pessoa != null)
            {
                throw new BadRequestException("CPF já cadastrado no sistema.");
            }

            Usuario usuarioConvertido = UsuarioFactory.converterDtoParaModel(usuarioDTO);

            return _usuarioRepository.CadastrarUsuario(usuarioConvertido);

        }

        public UsuarioLogadoDTO ValidarLogin(LoginDTO usuarioDto)
        {
            var usuario = _usuarioRepository.FindByEmail(usuarioDto.Email);

            if (usuario == null || usuario.Senha != usuarioDto.Senha)
                throw new UnauthorizedException("Usuário ou senha inválido");

            return new UsuarioLogadoDTO
            {
                Id = usuario.Id,
                NomeUsuario = usuario.NomeUsuario,
                Email = usuario.Email,
                AutenticadoEm = DateTime.UtcNow
            };
        }

    }

}
