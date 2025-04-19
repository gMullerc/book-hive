import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Token } from "../../../core/@types/Token";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { guardarInformacoesUsuario } from "../../../core/helpers/guardarInformacoesUsuario";
import { usePost } from "../../../core/hooks/usePost";
import { CadastroForm } from "../@types/form/CadastroForm";
import { InformacoesEndereco } from "../components/InformacoesEndereco";
import { InformacoesPessoais } from "../components/InformacoesPessoais";
import { InformacoesUsuario } from "../components/InformacoesUsuario";
import { limparFormularioCadastro } from "../helpers/limparFormularioCadastro";
import { cadastroSchema } from "../validations/cadastroSchema";

export const CadastroPage = () => {
    const navigate = useNavigate();
    const methods = useForm<CadastroForm>({
        resolver: yupResolver(cadastroSchema),
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { post, data, error } = usePost<CadastroForm, Token>('/api/usuario/cadastrar');

    useEffect(() => {
        if (data) {
            guardarInformacoesUsuario(data)
            navigate('/livros');
        }
    }, [data]);


    useEffect(() => {
        if (error) {
            setSnackbarOpen(true)
        }
    }, [error]);

    const onSubmit = async (data: CadastroForm) => post(limparFormularioCadastro(data));

    return (<>

        <Grid container justifyContent="center" alignItems="center" height="100vh" size={{ xs: 12, md: 10 }}>
            <Grid size={{ xs: 12, md: 10 }}>
                <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h5" align="center" color="primary">
                        Cadastro BookHive
                    </Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '100%' }}>
                            <Grid container spacing={4} direction="column">
                                <InformacoesUsuario />
                                <Divider orientation="horizontal" flexItem />
                                <InformacoesPessoais />
                                <Divider orientation="horizontal" flexItem />
                                <InformacoesEndereco />
                                <CustomActionButton type="submit">Cadastrar</CustomActionButton>
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
