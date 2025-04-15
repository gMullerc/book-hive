import { Grid, Paper, Typography, Box, Button, Link } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { usePost } from "../../../core/hooks/usePost";
import { guardarInformacoesUsuario } from "../../../core/helpers/guardarInformacoesUsuario";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../@types/form/LoginForm"; 
import { Usuario } from "../../../core/@types/Usuario";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { post, data } = usePost<LoginForm, Usuario>('/api/usuario/login');
    const methods = useForm<LoginForm>({
        resolver: yupResolver(loginSchema),
    });
    const onSubmit = async (data: LoginForm) => {
        post(data);
    };

    useEffect(() => {
        if (data) {
            guardarInformacoesUsuario(data)
            navigate('/livros');
        }
    }, [data]);


    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Paper
                elevation={4}
                sx={{ p: 4, width: '100%', maxWidth: 400, height: 500 }}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '100%' }}>
                        <Grid container direction="column" gap={10} sx={{ height: '100%' }}>

                            <Typography variant="h5" align="center" color="primary">
                                BookHive
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={2}>
                                <CustomTextField name="email" label="E-mail" />
                                <CustomTextField name="senha" label="Senha" type="password" />
                                <CustomActionButton type="submit">Entrar</CustomActionButton>
                                <Box display="flex" justifyContent="center">
                                    <Typography noWrap color="textPrimary">
                                        {"Não tem uma conta? "}
                                        <Link sx={{cursor: "pointer"}} onClick={() => {
                                           navigate("/cadastro")
                                        }} >
                                            Clique aqui
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </form>
                </FormProvider>
            </Paper>
        </Grid>
    );
};
