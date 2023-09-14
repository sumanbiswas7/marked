"use client";

import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/use-theme";
import styles from "./toggle-theme-button.module.scss";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { DARK_THEME, LIGHT_THEME } from "../../../theme";

export function ToggleThemeButton() {
   const { setTheme, theme } = useTheme();

   function onToggle() {
      if (theme.colorScheme === "light") setTheme(DARK_THEME);
      if (theme.colorScheme === "dark") setTheme(LIGHT_THEME);
   }

   return (
      <motion.button
         onClick={onToggle}
         className={styles.container}
         style={{ backgroundColor: theme.card.shade2 }}
      >
         {theme.colorScheme === "dark" ? (
            <IconSunHigh size={20} color={theme.text.shade1} />
         ) : (
            <IconMoon size={20} color={theme.text.shade1} />
         )}
      </motion.button>
   );
}
