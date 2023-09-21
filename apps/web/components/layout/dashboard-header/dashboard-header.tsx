"use client";

import styles from "./dashboard-header.module.scss";
import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/use-theme";
import React from "react";

export function DashboardSlotHeader({ title, buttonTitle, onClick, icon, description }: Props): JSX.Element {
   const { theme } = useTheme();

   const arrow = {
      animate: { rotate: 90, scale: 1.2 },
   };

   return (
      <div style={{ marginBottom: "1rem" }}>
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
                  {icon}
               </motion.div>

               {buttonTitle}
            </motion.button>
         </div>
         {description && (
            <p className={styles.description} style={{ color: theme.text.shade2 }}>
               {description}
            </p>
         )}
      </div>
   );
}

interface Props {
   title: string;
   description?: string;
   buttonTitle?: string;
   onClick?: () => void;
   icon: React.ReactNode;
}
