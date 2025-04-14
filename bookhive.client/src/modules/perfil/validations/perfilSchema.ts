import * as yup from 'yup';
import { Usuario } from '../../../core/@types/Usuario';

export const perfilSchema: yup.ObjectSchema<Usuario> = yup.object({
  id: yup.number().optional(),  
  nomeUsuario: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
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
      telefone: yup.string(),
      celular: yup.string().required("Campo obrigatório"),
      email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    }).required(),
  }).required(),
});
