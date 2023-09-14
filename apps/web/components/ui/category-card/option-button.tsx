"use client";

import { IconX, IconDots } from "@tabler/icons-react";
import styles from "./option-button.module.scss";
import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/use-theme";

export function OptionButton({ onClick, opened }: Props): JSX.Element {
   const { theme } = useTheme();

   return (
      <motion.button
         onClick={onClick}
         whileHover={{ scale: 1.2, rotate: 180 }}
         whileTap={{ scale: 0.85 }}
         className={styles.options}
         style={{ backgroundColor: theme.accent }}
      >
         {opened ? (
            <IconX size={13} color={theme.text.shade3} />
         ) : (
            <IconDots size={13} color={theme.text.shade3} />
         )}
      </motion.button>
   );
}

interface Props {
   onClick?: () => void;
   opened?: boolean;
}
