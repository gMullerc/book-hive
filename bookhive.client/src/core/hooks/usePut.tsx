import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/token/recuperarToken';

export function usePut<TRequest, TResponse>(url: string) {
  const { setLoading } = useLoading(); 

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const put = useCallback(async (body: TRequest): Promise<TResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const tokenLocal = recuperarToken();
      const response = await axios.put<TResponse>(url, body, {
        headers: {
          'Authorization': `Bearer ${tokenLocal}`
        }
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao atualizar dados';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, setLoading]);

  return { put, data, error };
}
