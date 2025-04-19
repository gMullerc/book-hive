import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/recuperarToken';

export function useGet<TResponse>(baseUrl: string) {
  const { setLoading } = useLoading();

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async (id: string | number = '', queryParams?: string): Promise<TResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const tokenLocal = recuperarToken();

      let url = "";

      if(queryParams){
        url = `${baseUrl}${queryParams}`;

      }else{
        url = id ? `${baseUrl}/${id}` : baseUrl;
      }


      const response = await axios.get<TResponse>(url, {
        headers: {
          'Authorization': `Bearer ${tokenLocal}`
        }
      });

      setData(response.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao buscar dados';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, setLoading]);

  return { get, data, error };
}
