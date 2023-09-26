import React from "react";
import { CustomMantineProvider } from "./mantine-provider";
import { TanstackQueryProvider } from "./tanstack-provider";
import { ThemeContextProvider } from "./theme-provider";
import { AuthUserContextProvider } from "./auth-user-provider";

export function Providers({ children }: { children: React.ReactNode }) {
   return (
      <AuthUserContextProvider>
         <ThemeContextProvider>
            <TanstackQueryProvider>
               <CustomMantineProvider>{children}</CustomMantineProvider>
            </TanstackQueryProvider>
         </ThemeContextProvider>
      </AuthUserContextProvider>
   );
}
