
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Livro } from "../../../core/@types/Livro";
import { useGet } from "../../../core/hooks/useGet";
import { IconButton } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Paper, Box, Card, CardContent, CardMedia, Typography, Divider, useTheme } from "@mui/material";


import { formatarDataDiaMesAno } from "../../../core/helpers/formatDate";
import { useDelete } from "../../../core/hooks/useDelete";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { CustomActionButton } from "../../../core/components/CustomActionButton";
import { usePost } from "../../../core/hooks/usePost";
import { usePut } from "../../../core/hooks/usePut";

export const DetalheLivroPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { get, error, data, setError: setErrorGetLivro } = useGet<Livro>("/api/livro/BuscarPorId");
    const { del, error: erroDeletarLivro, setError: setErrorDeletarLivro } = useDelete("/api/livro/Excluir");
    const { post: emprestar, error: erroEmprestar, success: successEmprestar, setError: setErrorEmprestarLivro } = usePost("/api/emprestimo/emprestar");
    const { put: devolver, error: erroDevolver, success: successEDevolver, setError: setErrorDevolverLivro } = usePut("/api/emprestimo/devolver");

    const [livro, setLivro] = useState<Livro | undefined>(undefined);

    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (data) {
            setLivro(data);
        }
    }, [data]);

    useEffect(() => {
        const erros = [erroDeletarLivro, erroEmprestar, erroDevolver, error];
        const erroAtual = erros.find(Boolean);
        setErrorMessage(erroAtual ?? "");
    }, [error, erroDeletarLivro, erroEmprestar, erroDevolver]);

    useEffect(() => {
        if (successEDevolver || successEmprestar) {
            get("", `?id=${id}`)
        }
    }, [successEmprestar, successEDevolver]);

    useEffect(() => {
        get("", `?id=${id}`)
    }, []);

    const handleDelete = async () => {
        const deleted = await del(`id=${id}`);
        if (deleted) {
            navigate('/livros');
        } else {
            setSnackbarOpen(true)
        }
    };

    const handleEmprestar = async () => {
        const response = await emprestar(null, id);
        if (response) {
            get("", `?id=${id}`)
        } else {
            setSnackbarOpen(true)
        }
    };


    const handleDevolver = async () => {
        const response = await devolver(null, id);
        if (response) {
            get("", `?id=${id}`)
        } else {
            setSnackbarOpen(true)
        }
    };


    return (
        <>
            <Grid container justifyContent="center" alignItems="center" >
                {livro && (

                    <Grid container justifyContent="center">
                        {livro && (
                            <Grid size={{ xs: 12, md: 10 }}>
                                <Paper elevation={4} sx={{ p: 4, width: 700, position: "relative" }}>
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
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Situação:</strong> {livro.situacaoLivro?.descricao}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container gap={2} flex="true" justifyContent="end" alignItems="center">


                                        <Grid size={4}>
                                            <CustomActionButton
                                                onClick={livro.situacaoLivro.codigo === "DISPONIVEL" ? handleEmprestar : handleDevolver}
                                            >
                                                { (livro.situacaoLivro.codigo === "DISPONIVEL") ? "Emprestar" : "Devolver" }
                                            </CustomActionButton>
                                        </Grid>
                                        <IconButton
                                            onClick={() => navigate(`/atualiza/livro/${livro.id}`)}
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: "#fff",
                                                "&:hover": {
                                                    backgroundColor: "#d32f2f",
                                                },
                                            }}
                                        >
                                            <ModeEditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleDelete}
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: "#fff",
                                                "&:hover": {
                                                    backgroundColor: "#d32f2f",
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                )}

            </Grid>
            <CustomSnackbar
                open={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                    setErrorDeletarLivro(null);
                    setErrorDevolverLivro(null);
                    setErrorEmprestarLivro(null);
                    setErrorGetLivro(null);
                    setErrorMessage("");
                }}
                message={errorMessage}
                severity="error"
            />
        </>
    );
}