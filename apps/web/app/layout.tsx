import "./globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CustomMantineProvider } from "../components/provider/mantine-provider";
import { ThemeContextProvider } from "../components/provider/theme-provider";

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
         <ThemeContextProvider>
            <CustomMantineProvider>
               <body className={poppins.className}>{children}</body>
            </CustomMantineProvider>
         </ThemeContextProvider>
      </html>
   );
}
