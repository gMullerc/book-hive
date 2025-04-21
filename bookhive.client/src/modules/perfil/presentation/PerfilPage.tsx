import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../../core/@types/Usuario";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { useGet } from "../../../core/hooks/useGet";
import { usePut } from "../../../core/hooks/usePut";
import { PerfilForm } from "../@types/form/perfilForm";
import { InformacoesEndereco } from "../components/InformacoesEndereco";
import { InformacoesPessoais } from "../components/InformacoesPessoais";
import { InformacoesUsuario } from "../components/InformacoesUsuario";
import { perfilSchema } from "../validations/perfilSchema";

export const PerfilPage = () => {
    const navigate = useNavigate();
    const methods = useForm<Usuario>({
        resolver: yupResolver(perfilSchema),
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { get: getUsuario, data: dadosUsuario, error: erroBuscaUsuario } = useGet<any>('/api/usuario');

    const { put: alterarInformacoesCadastrais, data: dadosInformacoesCadastrais, error: erroInformacoesCadastrais } = usePut<PerfilForm, PerfilForm>('/api/pessoa/atualizar');

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        if (erroInformacoesCadastrais || erroBuscaUsuario) {
            setSnackbarOpen(true)
        }
    }, [erroInformacoesCadastrais || erroBuscaUsuario]);

    useEffect(() => {
        if (dadosUsuario) {
            methods.reset(dadosUsuario);
        }

    }, [dadosUsuario])

    const onSubmit = async (data: Usuario) => {
        if (data.id != null) {
            const pessoa = data?.pessoa;

            const perfilForm: PerfilForm = {
                id: data.id,
                nome: pessoa?.nome,
                endereco: pessoa?.endereco,
                contato: pessoa?.contato
            }

            alterarInformacoesCadastrais(perfilForm);
        }
    };

    return (<>
        <Grid container justifyContent="center" alignItems="center" height="100vh" size={{ xs: 12, md: 10 }}>
            <Grid size={{ xs: 12, md: 10 }}>
                <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
                    <Grid container flex="true" justifyContent="space-between">
                        <ArrowBackIcon color="primary" onClick={() => navigate(-1)} sx={{ cursor: 'pointer' }} />

                        <Typography variant="h5" align="center" color="primary">
                            Perfil
                        </Typography>
                        <ArrowBackIcon sx={{ visibility: 'hidden' }} />
                    </Grid>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '100%' }}>
                            <Grid container spacing={4} direction="column">
                                <InformacoesUsuario />
                                <Divider orientation="horizontal" flexItem />
                                <InformacoesPessoais />
                                <Divider orientation="horizontal" flexItem />
                                <InformacoesEndereco />
                                <CustomActionButton type="submit">Enviar</CustomActionButton>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </Grid>
        </Grid>
        <CustomSnackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={erroInformacoesCadastrais ?? erroBuscaUsuario ?? ""}
            severity="error"
        />
    </>
    );
}