import { DARK_THEME } from "./dark-theme";
import { LIGHT_THEME } from "./light-theme";

export { LIGHT_THEME, DARK_THEME };

export interface MyTheme {
   colorScheme: "light" | "dark";
   accent: string;
   background: string;
   text: {
      shade1: string;
      shade2: string;
      shade3: string;
   };
   border: {
      shade1: string;
      shade2: string;
      shade3: string;
   };
   card: {
      shade1: string;
      shade2: string;
      shade3: string;
   };
   green: string;
   red: string;
}
