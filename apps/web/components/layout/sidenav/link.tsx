"use client";

import Link from "next/link";
import styles from "./link.module.scss";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "../../../hooks/use-theme";

export function SideNavLink({ to, title, icons, bottom }: Props): JSX.Element {
   const pathname = usePathname();
   const { theme } = useTheme();

   const style = {
      backgroundColor: pathname === to ? theme.accent : "transparent",
      color: pathname === to ? theme.text.shade3 : theme.accent,
   };

   const bottomStyle = {
      backgroundColor: theme.card.shade1,
      color: theme.text.shade1,
   };

   const arrow = {
      animate: { x: 10 },
   };

   return (
      <motion.div whileHover="animate">
         <Link
            href={to}
            className={
               bottom
                  ? `${styles.container} ${styles.bottom_link}`
                  : styles.container
            }
            style={bottom ? bottomStyle : style}
         >
            <motion.span variants={arrow} className={styles.icon_title_cont}>
               <span className={styles.icon_cont}>
                  {pathname === to ? icons?.active : icons?.inactive}
               </span>
               <p className={styles.title}>{title}</p>
            </motion.span>
         </Link>
      </motion.div>
   );
}

interface Props {
   to: string;
   title: string;
   iconSize?: number;
   icons?: { active: React.ReactNode; inactive: React.ReactNode };
   bottom?: boolean;
}
