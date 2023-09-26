import "./globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "../components/provider/providers";

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
         <Providers>
            <body className={poppins.className}>
               <NextTopLoader color="#2E2E2E" showSpinner={false} shadow={false} />
               {children}
            </body>
         </Providers>
      </html>
   );
}
