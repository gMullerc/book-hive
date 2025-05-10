import { yupResolver } from "@hookform/resolvers/yup";
import { CardMedia, Divider, Grid, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { usePut } from "../../../core/hooks/usePut";
import { CadastroLivroForm } from "../@types/form/CadastroLivroForm";
import { InformacoesLivro } from "../components/InformacoesLivro";
import { livroSchema } from "../validations/livroSchema";

import { Livro } from "../../../core/@types/Livro";
import { useGet } from "../../../core/hooks/useGet";

export const AtualizaLivroPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const methods = useForm<CadastroLivroForm>({
        resolver: yupResolver(livroSchema),
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [storedFiles, setStoredFiles] = useState<File[]>([]);

    const { put, data, error, success, setSuccess } = usePut<CadastroLivroForm, void>("/api/livro/atualizar");

    const getLivro = useGet<Livro>("/api/livro/BuscarPorId");

    const [livro, setLivro] = useState<Livro | undefined>(undefined);

    const converterParaBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = error => reject(error);
        });
    };

    const onCloseSnackBar = () => {
        setSnackbarOpen(false);

    };

    useEffect(() => {
        getLivro.get("", `?id=${id}`);
    }, [id]);
    
    useEffect(() => {
        if (getLivro.data) {

            const livroData = getLivro.data;

            Object.keys(livroData).forEach((key) => methods.setValue(key as keyof CadastroLivroForm, livroData[key as keyof Livro]));
            //Object.entries(livroData).forEach(([key, value]) => {
            //    methods.setValue(key as keyof CadastroLivroForm, value as any);
            //});

        }
    }, [getLivro.data]);

    useEffect(() => {
        if (getLivro.data) {
            console.log("Dados do livro:", getLivro.data);
        }
    }, [getLivro.data]);

    useEffect(() => {
        if (success) {
            navigate("/livros");
            setSuccess(false);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            setSnackbarOpen(true);
        }
    }, [error]);

    useEffect(() => {
        if(success){
            navigate("/livros")
        }
    }, [success]);

       

    const onSubmit = async (formData: CadastroLivroForm) => {
        try {
            // Inclui o id e imagem no objeto de atualização
            const payload: any = {
                ...formData,
                id: id ?? "", 
                imagem: {
                    nomeImagem: getLivro.data?.nomeImagem,
                    extensaoImagem: getLivro.data?.caminhoImagem,
                    imageBase64: "-1",
                    
                }
            };

            console.log("IMAGEM NO STORAGE", storedFiles)

            if (storedFiles.length > 0) {
                payload.imagem = {
                    nomeImagem: storedFiles[0].name,
                    extensaoImagem: storedFiles[0].type,
                    imageBase64: await converterParaBase64(storedFiles[0]),
                };
            }

            console.log("PAYLOAD FINAL", payload)

            // Enviar os dados atualizados para a API
            await put(payload);

            //await put(formData);
        } catch (error) {
            console.error("Erro ao atualizar o livro:", error);
        }
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <Grid size={{ xs: 12, md: 10 }} >
                    <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
                        
                        {getLivro.data && (
                        
                            <Grid container spacing={2} direction="column" alignItems="center" sx={{ pb: 4 }}>
                               
                                    <Typography variant="h5" align="center" color="primary" >
                                        {getLivro.data.titulo}
                                </Typography>
                                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 4 }}>

                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 200, objectFit: 'scale-down', borderRadius: 2 }}
                                                image={`https://storage.googleapis.com/${getLivro.data.caminhoImagem}`}
                                                title={getLivro.data.nomeImagem}
                                    />

                                   
                                    
                            </Grid>
                            </Grid>
                                     )}

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Grid container spacing={4}>
                                    <InformacoesLivro
                                        setStoredFiles={setStoredFiles}
                                        storedFiles={storedFiles}
                                        onError={(value) => { console.log("error img", value) } }
                                    />
                                    <Grid size={{ xs: 12 }}>
                                        <Divider orientation="horizontal" flexItem />
                                    </Grid>

                                    <Grid size={{ xs: 3 }}>
                                        <CustomActionButton type="submit">Atualizar</CustomActionButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </FormProvider>
                    </Paper>
                </Grid>
            </Grid>

            <CustomSnackbar
                open={snackbarOpen}
                onClose={onCloseSnackBar}
                message={error ?? ""}
                severity="error"
            />
        </>
    );
};
