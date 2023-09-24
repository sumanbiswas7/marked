import { AuthUserContextProvider } from "./auth-user-provider";
import { CustomMantineProvider } from "./mantine-provider";
import { TanstackQueryProvider } from "./tanstack-provider";
import { ThemeContextProvider } from "./theme-provider";

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
