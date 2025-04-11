import { json } from "stream/consumers";
import { Usuario } from "../../../core/@types/Usuario";
import { stringify } from "querystring";

export const guardarInformacoesUsuario = (usuario: Usuario) => {
    if (!usuario) return;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
}