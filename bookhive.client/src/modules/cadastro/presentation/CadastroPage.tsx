import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { cadastroSchema } from "../validations/cadastroSchema";
import { InformacoesUsuario } from "../components/InformacoesUsuario";
import { InformacoesPessoais } from "../components/InformacoesPessoais";
import { InformacoesEndereco } from "../components/InformacoesEndereco";
import { CadastroForm } from "../@types/form/CadastroForm";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { usePost } from "../../../core/hooks/usePost";
import { useEffect } from "react";
import { guardarInformacoesUsuario } from "../../../core/helpers/guardarInformacoesUsuario";
import { useNavigate } from "react-router-dom";
import { limparFormularioCadastro } from "../helpers/limparFormularioCadastro";
import { Usuario } from "../../../core/@types/Usuario";
import { Token } from "../../../core/@types/Token";

export const CadastroPage = () => {
    const navigate = useNavigate();
    const methods = useForm<CadastroForm>({
        resolver: yupResolver(cadastroSchema),
    });

    const { post, data } = usePost<CadastroForm, Token>('/api/usuario/cadastrar');

    useEffect(() => {
        if (data) {
            guardarInformacoesUsuario(data)
            navigate('/livros');
        }
    }, [data]);

    const onSubmit = async (data: CadastroForm) => post(limparFormularioCadastro(data));

    return (
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
    );
};
