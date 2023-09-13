"use client";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { COLORS } from "../../theme/colors";

export function CustomMantineProvider({ children }) {
   const brandColors: any = new Array(10).fill(COLORS.textSwatch);

   return (
      <MantineProvider
         withGlobalStyles
         withNormalizeCSS
         theme={{
            colors: {
               brand: brandColors,
            },
            colorScheme: COLORS.colorScheme,
            primaryColor: "brand",
            breakpoints: {
               xs: "30em", // 480px
               sm: "48em", // 768px
               md: "64em", // 1024px
               lg: "74em", // 1184px
               xl: "90em", // 1185px and above
            },
         }}
      >
         <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
   );
}
