"use client";

import Link from "next/link";
import { COLORS } from "../../../../theme/colors";
import styles from "./notification-button.module.scss";
import { motion } from "framer-motion";

export function NotificationButton({ count }: NotificationProps): JSX.Element {
   return (
      <Link href={"/notifications"}>
         <motion.div
            whileHover={{ scale: 0.85 }}
            className={styles.notification_container}
            style={{ backgroundColor: COLORS.textLight2Swatch }}
         >
            <img src="/dashboard_header/bell.svg" />

            <motion.span
               animate={{ scale: [0, 3, 1], y: [3, 0] }}
               transition={{ duration: 0.5 }}
               className={styles.count_container}
               style={{ backgroundColor: count ? COLORS.red : COLORS.green }}
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
