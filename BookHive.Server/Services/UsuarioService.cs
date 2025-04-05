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
    public interface IUsuarioService {
        public int CadastrarUsuario(UsuarioDto usuarioDTO);
        public UsuarioLogadoDTO ValidarLogin(LoginDTO usuarioDto);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }


        public int CadastrarUsuario(UsuarioDto usuarioDTO)
        {
            Usuario? usuario = _usuarioRepository.FindByNomeUsuario(usuarioDTO.NomeUsuario);

            if (usuario != null)
            {
                throw new BadRequestException("Nome de usuário ja utilizado");
            }

            usuario = _usuarioRepository.FindByEmail(usuarioDTO.Email);

            if (usuario != null)
            {
                throw new BadRequestException("E-mail ja utilizado");
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
