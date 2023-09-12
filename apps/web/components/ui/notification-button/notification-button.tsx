"use client";

import Link from "next/link";
import { COLORS } from "../../../theme/colors";
import styles from "./notification-button.module.scss";
import { motion } from "framer-motion";

export function NotificationButton({ count }: NotificationProps): JSX.Element {
   const zoom = {
      animate: { scale: 1.3 },
   };

   return (
      <Link href={"/notifications"}>
         <motion.div
            whileHover="animate"
            className={styles.notification_container}
            style={{ backgroundColor: COLORS.textLight2Swatch }}
         >
            <img src="/dashboard_header/bell.svg" />

            <motion.span
               className={styles.count_container}
               style={{ backgroundColor: count ? COLORS.red : COLORS.green }}
               variants={zoom}
            >
               {count ? count : <img src="/dashboard_header/tick.svg" />}
            </motion.span>
         </motion.div>
      </Link>
   );
}

interface NotificationProps {
   count?: number;
}
