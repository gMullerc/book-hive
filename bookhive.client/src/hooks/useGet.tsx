import { useEffect, useState } from 'react';
import axios from 'axios';

export function useGet<T>(url: string, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        axios.get<T>(url)
            .then((res: any) => {
                if (isMounted) setData(res.data);
            })
            .catch((err: any) => {
                    if (isMounted) setError(err.message || 'Erro ao buscar dados');
                })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false };
    }, dependencies);

    return { data, loading, error };
}
