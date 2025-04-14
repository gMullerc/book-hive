import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from "./modules/login/presentation/LoginPage";
import { CadastroPage } from './modules/cadastro/presentation/CadastroPage';
import { DefaultLayout } from './core/components/DefaultLayout';
import { PerfilPage } from './modules/perfil/presentation/PerfilPage';

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
            <Route path="/cadastro" element={<CadastroPage />} />

            <Route path="/livros" element={
                <DefaultLayout>
                    <>HOME</>
                </DefaultLayout>
            } />

            <Route path="/perfil" element={
                <DefaultLayout>
                    <PerfilPage></PerfilPage>
                </DefaultLayout>
            } />
        </Routes>
    );
};
