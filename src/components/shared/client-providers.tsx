"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { Toaster } from "sonner"
import {QueryClientProvider} from "@tanstack/react-query";
import { useTanstackQuery } from "@/lib/tanstack-query";
type ClientProvidersProps = {
    children: ReactNode
}
export const ClientProviders = ({children}:ClientProvidersProps) => {
    const queryClient = useTanstackQuery();
    return (
        <QueryClientProvider client={queryClient}>
              <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </QueryClientProvider>
    )
}