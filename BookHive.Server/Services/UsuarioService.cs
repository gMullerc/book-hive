using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookHive.Server.Dtos;
using BookHive.Server.Exceptions;
using BookHive.Server.Factories;
using BookHive.Server.Models;
using BookHive.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace BookHive.Server.Services
{
    public interface IUsuarioService
    {
        public string CadastrarUsuario(UsuarioDto usuarioDTO);
        public UsuarioConsultaDto BuscarUsuarioLogado(string? id);
        public string ValidarLogin(LoginDTO usuarioDto);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IAuthService _authService;

        public UsuarioService(
            IUsuarioRepository usuarioRepository,
            IPessoaRepository pessoaRepository,
            IAuthService authService)
        {
            _pessoaRepository = pessoaRepository;
            _usuarioRepository = usuarioRepository;
            _authService = authService;
        }

        public UsuarioConsultaDto BuscarUsuarioLogado(string? id)
        {
            if(id == null) throw new BadRequestException("ID não encontrado.");

            int idConvertido = int.Parse(id);

            Usuario? usuario = _usuarioRepository.FindUsuarioById(idConvertido);

            if (usuario == null) throw new BadRequestException("Usuário não encontrado.");

            return UsuarioFactory.converterModelParaDto(usuario);
        }

        public string CadastrarUsuario(UsuarioDto usuarioDTO)
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

            Usuario usuarioSalvo = _usuarioRepository.CadastrarUsuario(usuarioConvertido);

            return _authService.GerarJwtToken(usuarioSalvo);
        }

        public string ValidarLogin(LoginDTO usuarioDto)
        {
            var usuario = _usuarioRepository.FindByEmail(usuarioDto.Email);

            if (usuario == null || usuario.Senha != usuarioDto.Senha)
                throw new UnauthorizedException("E-mail ou senha inválido");

            return _authService.GerarJwtToken(usuario);
        }
    }

}
