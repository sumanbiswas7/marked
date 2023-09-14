"use client";

import React, { createContext, useState } from "react";
import { MyTheme } from "../../theme";
import { LIGHT_THEME } from "../../theme/light-theme";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider({ children }: Props) {
   const [theme, setTheme] = useState<MyTheme>(LIGHT_THEME);

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   );
}

/**
 * ------------------
 *      Types
 * ------------------
 */
export type ThemeContextType = {
   theme: MyTheme;
   setTheme: React.Dispatch<React.SetStateAction<MyTheme>>;
};
interface Props {
   children: React.ReactNode;
}
