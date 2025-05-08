import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { DefaultLayout } from './core/components/DefaultLayout';
import { CadastroPage } from './modules/cadastro/presentation/CadastroPage';
import { DetalheLivroPage } from './modules/detalhe-livro/presentation/DetalheLivroPage';
import { ListagemLivrosPage } from './modules/listagem-livros/presentation/ListagemLivrosPage';
import { LoginPage } from "./modules/login/presentation/LoginPage";
import { PerfilPage } from './modules/perfil/presentation/PerfilPage';
import { CadastroLivroPage } from './modules/cadastro-livro/presentation/CadastroLivroPage';

export const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const publicRoutes = ['/login', '/cadastro'];
        const user = sessionStorage.getItem('token');
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
                    <ListagemLivrosPage></ListagemLivrosPage>
                </DefaultLayout>
            } />
            <Route path="/livro/:id" element={
                <DefaultLayout>
                    <DetalheLivroPage />
                </DefaultLayout>
            } />
            <Route path="/Excluir/:id" element={
                <DefaultLayout>
                    <ListagemLivrosPage></ListagemLivrosPage>
                </DefaultLayout>
            } />

            <Route path="/cadastro/livro" element={
                <DefaultLayout>
                    <CadastroLivroPage />
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
