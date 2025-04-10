import { useGet } from "./hooks/useGet";

export const App = () => {
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
    
    type Usuario = {
        nomeUsuario: string;
        email: string;
        pessoa: Pessoa;
    };

    const { data: usuario, loading, error } = useGet<Usuario>("/api/usuario/1");

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>Dados do Usuário</h1>

            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}

            {usuario && (
                <div>
                    <p><strong>Nome de Usuário:</strong> {usuario.nomeUsuario}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Nome:</strong> {usuario.pessoa.nome}</p>
                    <p><strong>CPF:</strong> {usuario.pessoa.cpf}</p>
                    <p><strong>RG:</strong> {usuario.pessoa.rg}</p>

                    <h3>Endereço</h3>
                    <p>{usuario.pessoa.endereco.logradouro}, {usuario.pessoa.endereco.numero}</p>
                    <p>{usuario.pessoa.endereco.bairro} - {usuario.pessoa.endereco.cidade}/{usuario.pessoa.endereco.estado}</p>
                    <p>CEP: {usuario.pessoa.endereco.cep}</p>

                    <h3>Contato</h3>
                    <p>Telefone: {usuario.pessoa.contato.telefone}</p>
                    <p>Celular: {usuario.pessoa.contato.celular}</p>
                    <p>Email: {usuario.pessoa.contato.email}</p>
                </div>
            )}
        </div>
    );
};
