import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { usePost } from "../../../core/hooks/usePost";
import { livroSchema } from "../validations/livroSchema";
import { InformacoesLivro } from "../components/InformacoesLivro";
import { CadastroLivroForm } from "../@types/form/CadastroLivroForm";

export const CadastroLivroPage = () => {
    const navigate = useNavigate();

    const methods = useForm<CadastroLivroForm>({
        resolver: yupResolver(livroSchema),
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { post, data, error } = usePost<CadastroLivroForm, void>("/api/livro/cadastrar");

    useEffect(() => {
        if (data) {
            navigate("/livros");
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setSnackbarOpen(true);
        }
    }, [error]);

    const onSubmit = async (data: CadastroLivroForm) => post(data);
    
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <Grid size={{ xs: 12, md: 10 }} >
                    <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
                        <Typography sx={{mb:4}} variant="h5" align="center" color="primary">
                            Cadastro de Livro
                        </Typography>

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Grid container spacing={4}>
                                    <InformacoesLivro />

                                    <Grid size={{xs:12}}>
                                        <Divider orientation="horizontal" flexItem />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <CustomActionButton type="submit">Cadastrar</CustomActionButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </FormProvider>
                    </Paper>
                </Grid>
            </Grid>

            <CustomSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={error ?? ""}
                severity="error"
            />
        </>
    );
};
