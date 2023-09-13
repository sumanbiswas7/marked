"use client";

import Link from "next/link";
import { THEME } from "../../../theme";
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
            style={{ backgroundColor: THEME.card.shade2 }}
         >
            <img src="/dashboard_header/bell.svg" />

            <motion.span
               className={styles.count_container}
               style={{ backgroundColor: count ? THEME.red : THEME.green }}
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
