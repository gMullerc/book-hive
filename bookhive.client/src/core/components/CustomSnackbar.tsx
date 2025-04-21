import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

type CustomSnackbarProps = {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
    anchorOrigin?: {
        vertical: 'top' | 'bottom',
        horizontal: 'right' | 'left' | 'center'
    }
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, onClose, message, severity = 'info', anchorOrigin }) => {

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={anchorOrigin ?? { vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={onClose}
            >
                <Alert  sx={{borderRadius: 100}} onClose={onClose} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}