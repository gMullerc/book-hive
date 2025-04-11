import * as yup from 'yup';
import { LoginForm } from '../../../core/@types/LoginForm';

export const loginSchema: yup.ObjectSchema<LoginForm> = yup.object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório"),
  });