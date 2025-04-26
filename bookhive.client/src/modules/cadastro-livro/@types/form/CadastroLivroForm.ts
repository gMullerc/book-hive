export type CadastroLivroForm = {
    titulo: string,
    autor: string,
    editora: string,
    isbn: string,
    dataPublicacao: string,
}

export type Imagem = {
    nomeImagem: string,
    extensaoImagem: string,
    imageBase64: string,
};