"use client";

import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/use-theme";
import styles from "./circle-button.module.scss";
import React from "react";

export function CircleButton({ icon, onClick }: Props) {
   const { theme } = useTheme();

   return (
      <motion.button
         whileHover={{ scale: 1.2, rotate: 90 }}
         whileTap={{ scale: 0.8 }}
         className={styles.add_button}
         style={{ backgroundColor: theme.accent }}
         onClick={onClick}
      >
         {icon}
      </motion.button>
   );
}

interface Props {
   onClick?: () => void;
   icon: React.ReactNode;
}
