import { format } from "date-fns";

export const formatarDataDiaMesAno = (data: string) => {
    if(!data) return "";

    return format(data, 'dd/MM/yyyy');
}