import { removeSpecialCharacters } from "../../../core/helpers/removeSpecialCharacters";
import { CadastroForm } from "../@types/form/CadastroForm";

export const limparFormularioCadastro = (data: CadastroForm): CadastroForm => {

    const { pessoa } = data;

    return {
        ...data,
        pessoa: {
            ...pessoa,
            cpf: removeSpecialCharacters(pessoa.cpf)!,
            rg: removeSpecialCharacters(pessoa.rg)!,
            contato: {
                ...pessoa.contato,
                celular: removeSpecialCharacters(pessoa.contato.celular)!,
                telefone: removeSpecialCharacters(pessoa.contato.telefone)
            },
            endereco: {
                ...pessoa.endereco,
                cep: removeSpecialCharacters(pessoa.endereco.cep)!
            }
        }
    }

}