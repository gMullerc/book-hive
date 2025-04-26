import { CadastroLivroForm } from "../@types/form/CadastroLivroForm";

export const agruparInformacoesCadastroLivro = async (data: CadastroLivroForm, arquivosSelecionados: File[]) => {

    const imagemSelecionada = arquivosSelecionados[0];

    const base64 = await blobToBase64(imagemSelecionada);

    return {
        ...data,
        imagem: {
            nomeImagem: imagemSelecionada.name,
            extensaoImagem: imagemSelecionada.type,
            imageBase64: base64
        }
    }
}
const blobToBase64 = async (blob: Blob): Promise<string> => {
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}
