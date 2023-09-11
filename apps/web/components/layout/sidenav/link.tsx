"use client";

import Link from "next/link";
import styles from "./link.module.scss";
import { COLORS } from "../../../theme/colors";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function SideNavLink({
   to,
   title,
   iconSize,
   icons,
   bottom,
}: Props): JSX.Element {
   const pathname = usePathname();

   const style = {
      backgroundColor: pathname === to ? COLORS.textSwatch : "transparent",
      color: pathname === to ? COLORS.textLight2Swatch : COLORS.textSwatch,
   };

   const bottomStyle = {
      backgroundColor: COLORS.textLight2Swatch,
      color: COLORS.textSwatch,
   };

   const arrow = {
      animate: { x: 10 },
   };

   return (
      <motion.div animate={{ scale: [0.8, 1] }} whileHover="animate">
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
               {icons?.active && icons?.inactive && (
                  <span className={styles.icon_cont}>
                     {pathname === to ? (
                        <img
                           src={icons?.active}
                           style={{
                              width: iconSize || 15,
                              height: iconSize || 15,
                           }}
                        />
                     ) : (
                        <img
                           src={icons?.inactive}
                           style={{
                              width: iconSize || 15,
                              height: iconSize || 15,
                           }}
                        />
                     )}
                  </span>
               )}
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
   icons?: { active: string; inactive: string };
   bottom?: boolean;
}
