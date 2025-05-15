import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { recuperarToken } from '../helpers/token/recuperarToken';
import { useNavigate } from 'react-router-dom';
import { removerToken } from '../helpers/token/removerToken';

export function useGet<TResponse>(baseUrl: string) {
  const navigate = useNavigate();
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
      if(err.response.status === 401){
        removerToken();
        navigate("/login");
        return null;
      }
      const msg = err.response?.data?.message || 'Erro ao buscar dados';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, setLoading]);

  return { get, data, error, setError, setData };
}
