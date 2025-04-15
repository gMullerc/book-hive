import { Usuario } from "../@types/Usuario";

export const guardarInformacoesUsuario = (usuario: Usuario) => {
    if (!usuario) return;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
}