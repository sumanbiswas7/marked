import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client

export function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
   const queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: 10000, refetchOnWindowFocus: false } },
   });

   return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}
