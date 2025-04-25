import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Token } from "../../../core/@types/Token";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { guardarToken } from "../../../core/helpers/token/guardarToken";
import { usePost } from "../../../core/hooks/usePost";
import { LoginForm } from "../@types/form/LoginForm";
import { loginSchema } from "../validations/loginSchema";

export const LoginPage = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigate = useNavigate();
    const { post, data, error } = usePost<LoginForm, Token>('/api/usuario/login');
    const methods = useForm<LoginForm>({
        resolver: yupResolver(loginSchema),
    });
    const onSubmit = async (data: LoginForm) => {
        post(data);
    };

    useEffect(() => {
        if (data) {
            guardarToken(data)
            navigate('/livros');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setSnackbarOpen(true)
        }
    }, [error]);


    return (
        <>
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
                                            <Link sx={{ cursor: "pointer" }} onClick={() => {
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
            <CustomSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={error ?? ""}
                severity="error"
            />
        </>
    );
};
