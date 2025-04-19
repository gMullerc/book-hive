import { Token } from "../@types/Token";

export const guardarInformacoesUsuario = (token: Token) => {
    if (!token) return;
    sessionStorage.setItem('token', token.token);
}