import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/token/recuperarToken';
import { removerToken } from '../helpers/token/removerToken';
import { useNavigate } from 'react-router-dom';

export function usePost<TRequest, TResponse>(endpoint: string) {
  const baseUrl = "https://backend-142395531834.southamerica-east1.run.app"
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [success, setSuccess] = useState<boolean>(false);

  const post = useCallback(async (body: TRequest): Promise<TResponse | null> => {
    setLoading(true);
    setError(null);

    setSuccess(false);

    try {
      const tokenLocal = recuperarToken();
      const response = await axios.post<TResponse>(`${baseUrl}${endpoint}`, body, {
        headers: {
          'Authorization': `Bearer ${tokenLocal}`
        }
      });
      setSuccess(true);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        removerToken();
        navigate("/login");
        return null;
      }
      const msg = err.response?.data?.mensagem || 'Erro ao enviar dados';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint, setLoading]);

  return { post, data, error, success, setSuccess };
}
