

import { useState } from "react"
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const handleErrorMessage = (error:unknown) => {

    if(!axios.isAxiosError(error)){
        if(error instanceof Error){
            return error.message;
        }
        return "Ocorreu um erro inesperado"
    }

    return error?.response?.data?.message || "Ocorreu um erro inesperado."

}
export const useTanstackQuery = () => {
    const [queryClient] = useState(new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false, // Desligando para quando eu sair e voltar para aba ele nao faca uma nova consulta
                retry:false, // desabilitado para nao tentar um retry em caso de falha
            }
        },
        mutationCache: new MutationCache({
            onError:(error,_variable,_context,mutation) => {
                if(mutation.options.onError) return;
                const errorMessage = handleErrorMessage(error)
                toast.error(errorMessage)
            }
        })
    }));

    return queryClient;
}

