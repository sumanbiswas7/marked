"use client";

import Link from "next/link";
import styles from "./link.module.scss";
import { THEME } from "../../../theme";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

export function SideNavLink({
   to,
   title,
   iconSize,
   icons,
   icon,
   bottom,
}: Props): JSX.Element {
   const pathname = usePathname();

   const style = {
      backgroundColor: pathname === to ? THEME.accent : "transparent",
      color: pathname === to ? THEME.text.shade3 : THEME.accent,
   };

   const bottomStyle = {
      backgroundColor: THEME.card.shade1,
      color: THEME.text.shade1,
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
               <p>{title}</p>
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

   icon?: React.ReactNode;
}
