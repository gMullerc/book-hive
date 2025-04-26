import { ClearOutlined, DeleteOutlineOutlined, FileUpload, InsertDriveFile, InsertDriveFileOutlined } from "@mui/icons-material";
import { Box, CardActionArea, Grid, Typography, useTheme } from "@mui/material";

type Props = {
    onRemove: () => void;
    arquivoSelecionado: File
}
export const CustomFileArquivoSelecionado = ({arquivoSelecionado, onRemove}: Props) => {
    const theme = useTheme();
    const sizeEmMB = (arquivoSelecionado.size / (1024 * 1024)).toFixed(2);

    return (
        <Box sx={{
            width: "100%", 
            border: "2px solid",
            borderRadius: "1px",
        }}
        >
            <Grid container spacing={{ xs: 2 }}>
                <Grid size={{ xs: 3, sm: 2 }} sx={{
                    display: 'flex',
                    justifyContent: 'left',
                }}
                >
                    <Box
                        sx={{
                            height: 100,
                            width: 100,
                            backgroundColor: theme.palette.grey[200],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderLeft: "5px solid",
                            borderColor: theme.palette.primary.main,
                        }}
                    >
                        <InsertDriveFileOutlined sx={{ fontSize: { xs: 40, sm: 45 } }} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 8 }} container p={2} gap={0} flex="true" alignItems="center">
                    <Grid size={12}>
                        <Typography sx={{ fontSize: '1rem' }} >
                            {arquivoSelecionado.name}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography color={theme.palette.grey[700]} sx={{ fontSize: '0.8rem' }} >
                            {sizeEmMB} MB
                        </Typography>
                    </Grid>
                </Grid>
                <Grid

                    size={{ xs: 3, sm: 2 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                    }}
                >
                    <CardActionArea
                        sx={{
                            height: 100,
                            width: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => onRemove()}
                    >
                        <ClearOutlined sx={{ fontSize: { xs: 40, sm: 45 } }} />
                    </CardActionArea>
                </Grid>
            </Grid>
        </Box>


    );
}