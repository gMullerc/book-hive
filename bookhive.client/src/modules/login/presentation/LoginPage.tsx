import { Grid, Paper, Typography, Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";
import { LoginForm } from "../../../core/@types/LoginForm";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { usePost } from "../../../core/hooks/usePost";
import { Usuario } from "../../../core/@types/Usuario";
import { guardarInformacoesUsuario } from "../usecases/loginUsecase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { post, data} = usePost<LoginForm, Usuario>('/api/usuario/login');


    useEffect(() => {
        if (data) {
            guardarInformacoesUsuario(data)
            navigate('/livros');
        }
    }, [data]);


    const methods = useForm<LoginForm>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        post(data);
    };

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
                        <Grid container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>

                            <Typography variant="h5" align="center" color="primary">
                                BookHive
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={2}>
                                <CustomTextField name="email" label="E-mail" />
                                <CustomTextField name="senha" label="Senha" type="password" />
                                <CustomActionButton type="submit">Entrar</CustomActionButton>
                            </Box>

                            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                                Não tem conta? Cadastre-se
                            </Typography>

                        </Grid>
                    </form>
                </FormProvider>
            </Paper>
        </Grid>
    );
};
