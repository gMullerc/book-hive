import { Backdrop, CircularProgress } from '@mui/material'; 
import { useLoading } from '../contexts/LoadingContext';

export const GlobalLoader = () => {
  const { loading } = useLoading();

  return (
    <Backdrop open={loading} sx={{ zIndex: 1300, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
