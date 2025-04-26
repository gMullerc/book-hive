import { FileUpload } from "@mui/icons-material";
import { Box, Grid, Typography, useTheme } from "@mui/material";

type Props = {
    isDragActive: boolean; 
}
export const CustomFileSemSelecao = (props: Props) => {
    const theme = useTheme();

    return (

 
            <Box
                color="black"
                p={2}
                sx={{ 
                    width: "100%",
                    border: props.isDragActive ? "2px solid" : "2px dashed",
                    borderRadius: "5px",
                    borderColor: props.isDragActive ? theme.palette.primary.main : theme.palette.secondary.main,
                    transition: "border-color 0.3s ease, background-color 0.3s ease",
                    background: props.isDragActive ? theme.palette.action.hover : null,
                }}
            >
                <Grid container size={12} >
                    <Grid size={{ xs: 3, md: 4, lg: 5 }} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 2 }}>
                        <FileUpload sx={{ fontSize: 45, }} />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center', pr: 2 }}><Typography>Arraste sua imagem ou clique para selecionar</Typography></Grid>
                </Grid>
            </Box>
 

    );
}