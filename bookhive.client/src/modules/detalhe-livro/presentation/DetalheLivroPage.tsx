
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Livro } from "../../../core/@types/Livro";
import { useGet } from "../../../core/hooks/useGet";
import Button from "@mui/material/Button";

import { Grid, Paper, Box, Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";


import { formatarDataDiaMesAno } from "../../../core/helpers/formatDate";

export const DetalheLivroPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { get, error, data } = useGet<Livro>("/api/livro/BuscarPorId");

    const [livro, setLivro] = useState<Livro | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setLivro(data);
        }
    }, [data]);

    useEffect(() => {
        get("", `?id=${id}`)
    }, []);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" >
                {livro && (

                    <Grid container justifyContent="center">
                        {livro && (
                            <Grid size={{ xs: 12, md: 10 }}>
                                <Paper elevation={4} sx={{ p: 4, width: 700 }}>
                                    <Typography variant="h5" align="center" color="primary" gutterBottom>
                                        {livro.titulo}
                                    </Typography>
                                    

                                    <Grid container spacing={4} direction="row" alignItems="flex-start">
                                        <Grid size={{ xs: 12, md: 4 }} display="flex" justifyContent="center">
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 200, objectFit: 'scale-down', borderRadius: 2 }}
                                                image={`https://storage.googleapis.com/${livro.caminhoImagem}`}
                                                title={livro.nomeImagem}
                                            />
                                        </Grid>

                                        <Grid size={{ md: 1 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                            <Divider orientation="vertical" flexItem />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 7 }}>
                                            <Typography variant="body2" color="text.secondary" pb={1}>
                                                <strong>Autor:</strong> {livro.autor}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" pb={1}>
                                                <strong>Editora:</strong> {livro.editora}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" pb={1}>
                                                <strong>ISBN:</strong> {livro.isbn}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Publicado em:</strong> {formatarDataDiaMesAno(livro.dataPublicacao)}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent="flex-end" mb={1}>
                                        <Button variant="contained" color="primary" onClick={() => navigate(`/atualiza/livro/${livro.id}`)}>
                                            Atualizar informações do Livro
                                        </Button>
                                    </Grid>

                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                )}

            </Grid>
        </>
    );
}