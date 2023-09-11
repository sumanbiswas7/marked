"use client";

import { MantineProvider } from "@mantine/core";

export function CustomMantineProvider({ children }) {
   return (
      <MantineProvider
         withGlobalStyles
         withNormalizeCSS
         theme={{
            breakpoints: {
               xs: "30em", // 480px
               sm: "48em", // 768px
               md: "64em", // 1024px
               lg: "74em", // 1184px
               xl: "90em", // 1185px and above
            },
         }}
      >
         {children}
      </MantineProvider>
   );
}
