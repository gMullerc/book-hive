import { Contato, Endereco } from "../../../../core/@types/Usuario";

export type PerfilForm = {
    id: number;
    nome: string;
    endereco: Endereco;
    contato: Contato
}