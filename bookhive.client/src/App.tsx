import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from "./modules/login/presentation/LoginPage";

export const App = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const publicRoutes = ['/login', '/cadastro'];
        const user = sessionStorage.getItem('usuario');

        const isPublic = publicRoutes.includes(location.pathname);

        if (!user && !isPublic) {
            navigate('/login');
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};
