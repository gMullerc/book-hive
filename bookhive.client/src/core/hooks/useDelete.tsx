import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/token/recuperarToken';
import { useNavigate } from 'react-router-dom';
import { removerToken } from '../helpers/token/removerToken';

export function useDelete(baseUrl: string) {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const del = useCallback(async (queryParams: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const tokenLocal = recuperarToken();
            const url = `${baseUrl}?${queryParams}`;

            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${tokenLocal}`
                }
            });

            setSuccess(true);
            return true;
        } catch (err: any) {
            if (err.response?.status === 401) {
                removerToken();
                navigate("/login");
                return false;
            }
            const msg = err.response?.data?.mensagem || 'Erro ao deletar';
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    }, [baseUrl, setLoading]);

    return { del, error, success, setError };
}
