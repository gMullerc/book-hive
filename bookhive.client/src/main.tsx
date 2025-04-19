import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { GlobalLoader } from './core/components/GlobalLoader';
import { LoadingProvider } from './core/contexts/LoadingContext';
import { theme } from './core/themes/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingProvider>
          <App />
          <GlobalLoader />
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
);
