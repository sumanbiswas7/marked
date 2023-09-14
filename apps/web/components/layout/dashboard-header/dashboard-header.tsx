"use client";

import { IconPlus } from "@tabler/icons-react";
import styles from "./dashboard-header.module.scss";
import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/use-theme";

export function DashboardSlotHeader({
   title,
   buttonTitle,
   onClick,
}: Props): JSX.Element {
   const { theme } = useTheme();

   const arrow = {
      animate: { rotate: 90, scale: 1.2 },
   };

   return (
      <div className={styles.container}>
         <h2 style={{ color: theme.text.shade1 }}>{title}</h2>
         <motion.button
            whileHover="animate"
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
               backgroundColor: theme.accent,
               color: theme.text.shade3,
            }}
         >
            <motion.div
               variants={arrow}
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <IconPlus size={14} color={theme.text.shade3} />
            </motion.div>

            {buttonTitle}
         </motion.button>
      </div>
   );
}

interface Props {
   title: string;
   buttonTitle?: string;
   onClick?: () => void;
}
