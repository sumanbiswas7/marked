import "./globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CustomMantineProvider } from "../components/provider/mantine-provider";
import { ThemeContextProvider } from "../components/provider/theme-provider";
import { TanstackQueryProvider } from "../components/provider/tanstack-provider";
import { AuthUserContextProvider } from "../components/provider/auth-user-provider";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
   weight: ["200", "300", "400", "500", "600"],
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Marked",
   description: "All in one productivity app",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <html lang="en">
         <AuthUserContextProvider>
            <ThemeContextProvider>
               <TanstackQueryProvider>
                  <CustomMantineProvider>
                     <body className={poppins.className}>
                        <NextTopLoader color="#2E2E2E" showSpinner={false} shadow={false} />
                        {children}
                     </body>
                  </CustomMantineProvider>
               </TanstackQueryProvider>
            </ThemeContextProvider>
         </AuthUserContextProvider>
      </html>
   );
}
