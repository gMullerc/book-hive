
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Livro } from "../../core/@types/Livro";
import { useGet } from "../../core/hooks/useGet";

import { Grid, Paper, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";


import { formatarDataDiaMesAno } from "../../core/helpers/formatDate";

export const DetalheLivroPage = () => {
    const { id } = useParams();

    const {get, error, data} = useGet<Livro>("/api/livro/BuscarPorId");
    
    const [livro, setLivro] = useState<Livro | undefined>(undefined);

    useEffect(() => {
        if(data){
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

                    <Grid size={{ xs: 12, md: 10 }}>
                        <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
                            <Typography variant="h5" align="center" color="primary">
                                {livro && (livro.titulo)}
                            </Typography>

               
                   
                            <Box display='flex' justifyContent='center' pt={4}>
                            <CardMedia
                                sx={{ width: '100%', height: 200, p: 4 }}
                                image={`https://storage.googleapis.com/${livro.caminhoImagem}`}
                                    title={`${livro.nomeImagem}`}
                                    
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            {/*<CardContent sx={{ flex: '1 0 auto' }}>*/}
                                
                                <Typography variant="body2" color="text.secondary" pt={4}>
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
                            {/*</CardContent>*/}
                        </Box>
                        </Paper>
                    </Grid>
                    
                
                )}
                </Grid>
            
           
         </>
    );

}