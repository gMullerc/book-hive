import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Livro } from "../../../core/@types/Livro";

type Props = {
    livro: Livro;
    onClick?: () => void;
}

export const CardLivro = ({ livro, onClick }: Props) => {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }} >
            <CardActionArea onClick={onClick}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={`https://storage.googleapis.com/${livro.caminhoImagem}`}
                    title={`${livro.nomeImagem}`}
                />
                <CardContent>
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
                        <strong>Publicado em:</strong> {livro.dataPublicacao}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
