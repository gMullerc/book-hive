import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Livro } from "../../../core/@types/Livro";
import { formatarDataDiaMesAno } from "../../../core/helpers/formatDate";

type Props = {
    livro: Livro;
    onClick?: () => void;
}

export const CardLivro = ({ livro, onClick }: Props) => {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }} >
            <CardActionArea onClick={onClick}>
                <Box display='flex' justifyContent='center'>
                    <CardMedia
                        sx={{ width: '100%', height: 200, p: 4 }}
                        image={`https://storage.googleapis.com/${livro.caminhoImagem}`}
                        title={`${livro.nomeImagem}`}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography color="primary" variant="h6" component="div" gutterBottom>
                            {livro.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Autor:</strong> {livro.autor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Editora:</strong> {livro.editora}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>ISBN:</strong> {livro.isbn}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Publicado em:</strong> {formatarDataDiaMesAno(livro.dataPublicacao)}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
