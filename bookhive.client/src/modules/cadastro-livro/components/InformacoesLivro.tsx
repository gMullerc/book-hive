import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "../../../core/components/CustomTextField";

export const InformacoesLivro = () => {
    
    return (
        <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}} >
                <CustomTextField
                    required
                    label="Título"
                    maxLength={200}
                    name="titulo"
                />
            </Grid>
            <Grid size={{xs:12, md:6}} >
                <CustomTextField
                    required
                    label="Autor"
                    maxLength={150}
                    name="autor"
                />
            </Grid>
            <Grid size={{xs:12, md:6}} >
                <CustomTextField
                    required
                    label="Editora"
                    maxLength={150}
                    name="editora"
                />
            </Grid>
            <Grid size={{xs:12, md:6}} >
                <CustomTextField
                    required
                    label="ISBN"
                    maxLength={20}
                    name="isbn"
                />
            </Grid>
            <Grid size={{xs:12, md:6}} >
                <CustomTextField
                    required
                    label="Data de Publicação"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dataPublicacao"
                />
            </Grid>
        </Grid>
    );
};
