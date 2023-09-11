"use client";

import { MantineProvider } from "@mantine/core";

export function CustomMantineProvider({ children }) {
   return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
         {children}
      </MantineProvider>
   );
}
