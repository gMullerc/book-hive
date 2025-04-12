import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { maskCpf } from "../../../core/helpers/maskCpf";
import { maskCelular } from "../../../core/helpers/maskCelular";

export const InformacoesPessoais = () => {
    return <Grid container spacing={2}>
        <Grid size={12}>
            <Typography variant="h6" color="primary">
                Informações Pessoais
            </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField required maxLength={150} name="pessoa.nome" label="Nome" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
                required
                name="pessoa.cpf"
                label="CPF"
                mask={(value) => maskCpf(value)}
            />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField required maxLength={9} name="pessoa.rg" label="RG" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField maxLength={150} required name="pessoa.contato.email" label="E-mail" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
                name="pessoa.contato.telefone"
                label="Telefone"
                mask={(value) => maskCelular(value, 'telefone')}
            />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
                required
                name="pessoa.contato.celular"
                label="Celular"
                mask={(value) => maskCelular(value, 'celular')}
            />
        </Grid>
    </Grid>;
};
