import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Livro } from "../../core/@types/Livro";
import { useGet } from "../../core/hooks/useGet";

export const DetalheLivroPage = () => {
    const { id } = useParams();

    const {get, error, data} = useGet<Livro>("/api/livro/BuscarPorId");
    
    const [livro, setLivro] = useState<Livro | undefined>(undefined);

    useEffect(() => {
        if(data){
            setLivro(data);
        }
    }, [data]);

    useEffect(() => {
        get("", `?id=${id}`)
    }, []);

    return (
       <>
        {
            livro && (
             livro.id,
             livro.isbn
            )
         }
         </>
    );

}