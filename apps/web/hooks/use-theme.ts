"use client";

import { useContext } from "react";
import {
   ThemeContext,
   ThemeContextType,
} from "../components/provider/theme-provider";
import { MyTheme } from "../theme";

export function useTheme() {
   const myTheme = useContext(ThemeContext) as ThemeContextType;

   const theme = myTheme?.theme as MyTheme;
   const setTheme = myTheme?.setTheme;

   return { theme, setTheme };
}
