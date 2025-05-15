import { Dominio } from "./Dominio";

export type Livro = {
    id: number;
    titulo: string; 
    autor: string; 
    editora: string; 
    isbn: string; 
    dataPublicacao: string; 
    caminhoImagem: string;
    nomeImagem: string;
    situacaoLivro: Dominio;
}

