import * as yup from 'yup';
import { CadastroForm } from '../@types/form/CadastroForm';

export const cadastroSchema: yup.ObjectSchema<CadastroForm> = yup.object({
  nomeUsuario: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório").min(6, "Deve conter pelo menos 6 caracteres."),
  repetirSenha: yup
    .string()
    .required("Campo obrigatório")
    .test("validar-senha", "As senhas não coincidem", (value, parent) => {
      const { senha } = parent.parent;
      return senha === value;
    }),
  pessoa: yup.object({
    nome: yup.string().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
    rg: yup.string().required("Campo obrigatório"),
    endereco: yup.object({
      logradouro: yup.string().required("Campo obrigatório"),
      numero: yup.string().required("Campo obrigatório"),
      bairro: yup.string().required("Campo obrigatório"),
      cidade: yup.string().required("Campo obrigatório"),
      estado: yup.string().required("Campo obrigatório"),
      cep: yup.string().required("Campo obrigatório"),
    }).required(),
    contato: yup.object({
      email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
      telefone: yup.string(),
      celular: yup.string().required("Campo obrigatório"),
    }).required(),
  }).required(),
});
