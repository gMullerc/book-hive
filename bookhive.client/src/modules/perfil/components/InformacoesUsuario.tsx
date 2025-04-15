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
            <CustomTextField required disabled name="nomeUsuario" maxLength={20} label="Nome de usuário" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField disabled maxLength={150} required name="email" label="Email" />
        </Grid>
    </Grid>;
}