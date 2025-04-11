type Endereco = {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
};

type Contato = {
    telefone: string;
    celular: string;
    email: string;
};

type Pessoa = {
    nome: string;
    cpf: string;
    rg: string;
    endereco: Endereco;
    contato: Contato;
};

export type Usuario = {
    nomeUsuario: string;
    email: string;
    pessoa: Pessoa;
};