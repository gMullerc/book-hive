import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { InformacoesEndereco } from "../components/InformacoesEndereco";
import { InformacoesPessoais } from "../components/InformacoesPessoais";
import { InformacoesUsuario } from "../components/InformacoesUsuario";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { perfilSchema } from "../validations/perfilSchema";
import { useGet } from "../../../core/hooks/useGet";
import { useEffect } from "react";
import { recuperarInformacoesUsuario } from "../../../core/helpers/recuperarInformacoesUsuario";
import { Usuario } from "../../../core/@types/Usuario";
import { PerfilForm } from "../@types/form/perfilForm";
import { guardarInformacoesUsuario } from "../../../core/helpers/guardarInformacoesUsuario";
import { usePut } from "../../../core/hooks/usePut";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const PerfilPage = () => {
    const navigate = useNavigate();

    const methods = useForm<Usuario>({
        resolver: yupResolver(perfilSchema),
    });

    const { get: getUsuario, data: dadosUsuario, error } = useGet<any>('/api/usuario');

    const { put: alterarInformacoesCadastrais, data: dadosInformacoesCadastrais } = usePut<PerfilForm, PerfilForm>('/api/pessoa/atualizar');

    useEffect(() => {
        const usuario = recuperarInformacoesUsuario();
        if (usuario) {
            getUsuario(usuario.id);
        }
    }, []);

    useEffect(() => {
        if (dadosInformacoesCadastrais) {

            const dados = recuperarInformacoesUsuario();

            if (dados?.pessoa) {
                dados.pessoa.nome = dadosInformacoesCadastrais.nome;
                dados.pessoa.contato = dadosInformacoesCadastrais.contato;
                dados.pessoa.endereco = dadosInformacoesCadastrais.endereco;

                guardarInformacoesUsuario(dados);
            }
        }
    }, [dadosInformacoesCadastrais]);

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

    return (
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
    );
}