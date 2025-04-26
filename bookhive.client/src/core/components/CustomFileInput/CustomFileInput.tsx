
import { FileUpload } from '@mui/icons-material';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CustomFileSemSelecao } from './components/CustomFileSemSelecao';
import { CustomFileArquivoSelecionado } from './components/CustomFileArquivoSelecionado';

type Props = {
    onError: (value: string) => void,
    storedFiles: File[],
    setStoredFiles: (value: File[]) => void,
    label: string;
}

export const CustomFileInput = ({ onError, storedFiles, setStoredFiles, label }: Props) => {

    const theme = useTheme();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        let isMenorQue2MB = true;
        let isImagem = true;

        acceptedFiles.forEach(file => {
            isImagem = file.type.startsWith('image/');
            isMenorQue2MB = file.size <= 2 * 1024 * 1024;
        });

        if (!isImagem) {
            onError("Arquivo não é uma imagem válida.")
            return;
        }

        if (!isMenorQue2MB) {
            onError("Arquivo deve ter até 2MB")
            return;
        }

        setStoredFiles(acceptedFiles);



    }, []);

    const limparArquivos = () => {
        setStoredFiles([]);
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, disabled: storedFiles.length > 0 })


    return (
        <Box {...getRootProps()}>
            <Typography variant="h6" align="left" color="primary">
                {label}
            </Typography>

            <input {...getInputProps()} />
            {
                <Grid container flex="true" justifyContent='center'>
                    {
                        storedFiles.length > 0
                            ? <CustomFileArquivoSelecionado onRemove={limparArquivos} arquivoSelecionado={storedFiles[0]}></CustomFileArquivoSelecionado>
                            : <CustomFileSemSelecao isDragActive={isDragActive}></CustomFileSemSelecao>
                    }
                </Grid>
            }
        </Box>
    )
}