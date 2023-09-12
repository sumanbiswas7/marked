"use client";

import { IconPlus } from "@tabler/icons-react";
import styles from "./dashboard-header.module.scss";
import { COLORS } from "../../../theme/colors";
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
         <h2>{title}</h2>
         <motion.button
            whileHover="animate"
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
               backgroundColor: COLORS.textSwatch,
               color: COLORS.textLight2Swatch,
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
               <IconPlus size={14} color={COLORS.textLight2Swatch} />
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
