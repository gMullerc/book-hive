import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ThemeProvider } from '@emotion/react';
import { theme } from './core/themes/themes';
import { CssBaseline } from '@mui/material';
import { LoadingProvider } from './core/contexts/LoadingContext';
import { GlobalLoader } from './core/components/GlobalLoader';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoadingProvider>
                <App />
                <GlobalLoader/>
            </LoadingProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
