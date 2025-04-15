import { useState, useCallback } from 'react';
import axios from 'axios';
import { useLoading } from '../contexts/LoadingContext';

export function useGet<TResponse>(baseUrl: string) {
  const { setLoading } = useLoading();

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async (id: string | number = ''): Promise<TResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const url = id ? `${baseUrl}/${id}` : baseUrl;
      const response = await axios.get<TResponse>(url);
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
