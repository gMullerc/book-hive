import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Livro } from "../../../core/@types/Livro";
import { Pageable } from "../../../core/@types/Pageable";
import { useGet } from "../../../core/hooks/useGet";
import { CardLivro } from "../components/CardLivro";
const PAGE_SIZE = 8;
export const ListagemLivrosPage = () => {
    const navigate = useNavigate();
    const [livros, setLivros] = useState<Pageable<Livro> | undefined>();
    const [ currentPage, setCurrentPage ] = useState(1);

    const { get, data, error } = useGet<Pageable<Livro>>("/api/livro");

    useEffect(() => {
        get("",`?pageNumber=${currentPage}&pageSize=${PAGE_SIZE}`);
    }, [currentPage]);

    useEffect(() => {
        if (data) {
            setLivros(data);
        }
    }, [data]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
  

    return (
        <Grid container justifyContent="center" alignItems="center" height="100vh">
            <Grid size={{ xs: 12, md: 10 }}>
                <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h5" align="center" color="primary">
                        Livros
                    </Typography>
                    {
                       livros && (
                        livros.items.map((livro, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                                <CardLivro livro={livro}  onClick={() => navigate(`/livro/${livro.id}`)}/>
                            </Grid>

                        ))
                       )
                    }
                </Paper>
            </Grid>
        </Grid>
    );
}
