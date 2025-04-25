import { Token } from "../../@types/Token";

export const guardarToken = (token: Token) => {
    if (!token) return;
    sessionStorage.setItem('token', token.token);
}