import * as yup from "yup";

export const livroSchema = yup.object({
  titulo: yup.string().required("Título é obrigatório").max(200),
  autor: yup.string().required("Autor é obrigatório").max(150),
  editora: yup.string().required("Editora é obrigatória").max(150),
  isbn: yup.string().required("ISBN é obrigatório").max(20),
  dataPublicacao: yup
    .string()
    .required("Data de publicação é obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido (use AAAA-MM-DD)"),
});
