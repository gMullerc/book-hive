export type Endereco = {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
};

export type Contato = {
    celular: string;
    email: string;
    telefone?: string;
};

type Pessoa = {
    nome: string;
    cpf: string;
    rg: string;
    endereco: Endereco;
    contato: Contato;
};

export type Usuario = {
    id?: number;
    nomeUsuario: string;
    email: string;
    pessoa: Pessoa;
};