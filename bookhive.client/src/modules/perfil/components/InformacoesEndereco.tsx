import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { maskSomenteNumeros } from "../../../core/helpers/maskSomenteNumero";
import { maskCep } from "../../../core/helpers/cep";

export const InformacoesEndereco = () => {
    return <Grid container spacing={2}>
        <Grid size={12}>
            <Typography variant="h6" color="primary">
                Endereço
            </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField maxLength={150} required name="pessoa.endereco.logradouro" label="Logradouro" />
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
            <CustomTextField
                mask={(value) => value ? maskSomenteNumeros(value) : ""}
                maxLength={8}
                required
                name="pessoa.endereco.numero"
                label="Número"
            />
        </Grid>
        <Grid size={{ xs: 8, md: 4 }}>
            <CustomTextField
                required
                name="pessoa.endereco.cep"
                label="CEP"
                mask={(value) => value ? maskCep(value) : ""}
            />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField maxLength={100} required name="pessoa.endereco.bairro" label="Bairro" />
        </Grid>
        <Grid size={{ xs: 8, sm: 10, md: 4 }}>
            <CustomTextField maxLength={100} required name="pessoa.endereco.cidade" label="Cidade" />
        </Grid>
        <Grid size={{ xs: 4, sm: 2, md: 2 }}>
            <CustomTextField minLength={2} maxLength={2} required name="pessoa.endereco.estado" label="Estado" />
        </Grid>
    </Grid>;
};
