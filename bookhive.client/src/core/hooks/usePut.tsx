import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/token/recuperarToken';
import { useNavigate } from 'react-router-dom';
import { removerToken } from '../helpers/token/removerToken';

export function usePut<TRequest, TResponse>(endpoint: string) {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const put = useCallback(async (body?: TRequest, id?: string | number): Promise<TResponse | null> => {
    
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    setLoading(true);
    setError(null);
    
    setSuccess(false);

    try {
      const tokenLocal = recuperarToken();
      
      let urlRequisicao = `${baseUrl}${endpoint}`;
      if (id) {
        urlRequisicao = `${urlRequisicao}/${id}`
      }
      const response = await axios.put<TResponse>(urlRequisicao, body, {
        headers: {
          'Authorization': `Bearer ${tokenLocal}`
        }
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        removerToken();
        navigate("/login");
        return null;
      }
      const msg = err.response?.data?.message || 'Erro ao atualizar dados';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint, setLoading]);

  return { put, data, error, success, setError };
}
