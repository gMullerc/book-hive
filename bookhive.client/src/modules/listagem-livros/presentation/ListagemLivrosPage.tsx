import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Livro } from "../../../core/@types/Livro";
import { Pageable } from "../../../core/@types/Pageable";
import { CustomSnackbar } from "../../../core/components/CustomSnackbar";
import { useGet } from "../../../core/hooks/useGet";
import { CardLivro } from "../components/CardLivro";
import Button from "@mui/material/Button";


export const ListagemLivrosPage = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [livros, setLivros] = useState<Pageable<Livro> | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [ pageSize ] = useState(10);

    const { get, data, error } = useGet<Pageable<Livro>>("/api/livro");

    useEffect(() => {
        get("",`?pageNumber=${currentPage}&pageSize=${pageSize}`);
    }, [currentPage]);

    useEffect(() => {
        if (data) {
            setLivros(data);
        }
    }, [data]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" >
                <Grid size={{ xs: 12, md: 10 }}>
                    <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
                        <Typography variant="h5" align="center" color="primary">
                            Livros
                        </Typography>
                        <Grid container pt={12} spacing={2}>
                            {livros && (
                                livros.items.map((livro) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }} key={livro.id}>
                                        <CardLivro livro={livro} onClick={() => navigate(`/livro/${livro.id}`)} />
                                    </Grid>
                                )))
                            }
                        </Grid>
                        <Grid container justifyContent='center' pt={10}>
                            <Pagination onChange={handleChangePage} page={currentPage} count={livros?.totalPages ?? 0} color="primary" />
                        </Grid>
                        <Grid container justifyContent="flex-end" mb={1}>
                            <Button variant="contained" color="primary" onClick={() => navigate("/cadastro/livro")}>
                                Cadastrar Novo Livro
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <CustomSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={error ?? ""}
                severity="error"

            />
            
        </>

    );
}
