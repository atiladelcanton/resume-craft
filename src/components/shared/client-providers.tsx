"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode, Suspense, useEffect } from "react"
import { toast, Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query";
import { useTanstackQuery } from "@/lib/tanstack-query";
import { useSearchParams } from "next/navigation";
const CreditsToast = () => {
    const searchParams = useSearchParams();
    const successCheckoutParam = searchParams.get('success');
    useEffect(() => {
        if (successCheckoutParam === "true") {
            toast.success('Compra realizada com sucesso!');
        }
    }, [successCheckoutParam]);
    return null;
}
type ClientProvidersProps = {
    children: ReactNode
}
export const ClientProviders = ({ children }: ClientProvidersProps) => {
    const queryClient = useTanstackQuery();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Suspense>
                    <CreditsToast />
                </Suspense>
                {children}
                <Toaster />
            </ThemeProvider>
        </QueryClientProvider>
    )
}