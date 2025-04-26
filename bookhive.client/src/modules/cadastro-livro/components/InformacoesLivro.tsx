import { Grid } from "@mui/material";
import { CustomTextField } from "../../../core/components/CustomTextField";
import { CustomFileInput } from "../../../core/components/CustomFileInput/CustomFileInput";

type Props = {
    onError: (value: string) => void;
    storedFiles: File[],
    setStoredFiles: (value: File[]) => void
}


export const InformacoesLivro = ({ onError, storedFiles, setStoredFiles }: Props) => {

    return (
        <Grid display='flex' container size={{ xs: 12 }} spacing={2} >
            <Grid size={{ xs: 12, md: 6 }} >
                <CustomTextField
                    required
                    label="Título"
                    maxLength={200}
                    name="titulo"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
                <CustomTextField
                    required
                    label="Autor"
                    maxLength={150}
                    name="autor"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
                <CustomTextField
                    required
                    label="Editora"
                    maxLength={150}
                    name="editora"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
                <CustomTextField
                    required
                    label="ISBN"
                    maxLength={20}
                    name="isbn"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
                <CustomTextField
                    required
                    label="Data de Publicação"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dataPublicacao"
                />
            </Grid>

            <Grid size={{ xs: 12 }} >
                <CustomFileInput
                    onError={(value) => onError(value)}
                    storedFiles={storedFiles}
                    label="Foto da capa"
                    setStoredFiles={setStoredFiles}></CustomFileInput>
            </Grid>

        </Grid>
    );
};
