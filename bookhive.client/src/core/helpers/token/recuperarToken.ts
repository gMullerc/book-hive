
 
export const recuperarToken = () : string | undefined  =>  {
    const token = sessionStorage.getItem('token');

    if(token){
        return token;
    }
}