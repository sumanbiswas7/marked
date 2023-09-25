"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client

export function TanstackQueryProvider({ children }) {
   const queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: 100000, refetchOnWindowFocus: false } }, // stale time - 100s
   });

   return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}
