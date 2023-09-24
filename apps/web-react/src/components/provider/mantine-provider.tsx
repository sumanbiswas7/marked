import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useTheme } from "../../hooks/use-theme";
import { Toaster } from "react-hot-toast";

export function CustomMantineProvider({ children }: { children: React.ReactNode }) {
   const { theme } = useTheme();
   const brandColors: any = new Array(10).fill(theme.accent);

   return (
      <MantineProvider
         withGlobalStyles
         withNormalizeCSS
         theme={{
            colors: {
               brand: brandColors,
            },
            colorScheme: theme.colorScheme,
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
         <Toaster />
         <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
   );
}
