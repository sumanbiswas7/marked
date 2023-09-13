"use client";

import { IconPlus } from "@tabler/icons-react";
import styles from "./dashboard-header.module.scss";
import { THEME } from "../../../theme";
import { motion } from "framer-motion";

export function DashboardSlotHeader({
   title,
   buttonTitle,
   onClick,
}: Props): JSX.Element {
   const arrow = {
      animate: { rotate: 90, scale: 1.2 },
   };

   return (
      <div className={styles.container}>
         <h2 style={{ color: THEME.text.shade1 }}>{title}</h2>
         <motion.button
            whileHover="animate"
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
               backgroundColor: THEME.accent,
               color: THEME.text.shade3,
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
               <IconPlus size={14} color={THEME.text.shade3} />
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
