import { Usuario } from "../@types/Usuario";

 

export const recuperarInformacoesUsuario = () : Usuario | undefined  =>  {
    const usuario = sessionStorage.getItem('usuario');

    if(usuario){
        return JSON.parse(usuario);
    }
}