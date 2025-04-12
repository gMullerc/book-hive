import { Grid, Typography } from "@mui/material";
import { CustomTextField } from "../../../core/components/CustomTextField";

export const InformacoesUsuario = () => {
    return <Grid container spacing={2}>
        <Grid size={12}>
            <Typography variant="h6" color="primary">
                Informações Cadastrais
            </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField required name="nomeUsuario" maxLength={20} label="Nome de usuário" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField maxLength={150} required name="email" label="Email" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField type="password" required name="senha" label="Senha" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField type="password" required name="repetirSenha" label="Repetir senha" />
        </Grid>
    </Grid>;
}