export type CadastroForm = {
    nomeUsuario: string,
    email: string,
    senha: string,
    pessoa: PessoaForm,
}

type PessoaForm = {
    nome: string,
    cpf: string,
    rg: string,
    endereco: EnderecoForm,
    contato: ContatoForm,
}
type ContatoForm = {
    email: string,
    celular: string,
    telefone?: string,
};

type EnderecoForm = {
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
};
