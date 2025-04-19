import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Livro } from "../../../core/@types/Livro";

type Props = {
    livro: Livro;
    onClick?: () => void;
}

export const CardLivro = ({ livro, onClick }: Props) => {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                maxWidth: 360,
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                },
                m: 2
            }}
        >
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
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
