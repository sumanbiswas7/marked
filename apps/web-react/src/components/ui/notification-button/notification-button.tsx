"use client";

import Link from "next/link";
import styles from "./notification-button.module.scss";
import { motion } from "framer-motion";
import { IconBell } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";

export function NotificationButton({ count }: NotificationProps): JSX.Element {
   const { theme } = useTheme();

   const zoom = {
      animate: { scale: 1.3 },
   };

   return (
      <Link href={"/notifications"}>
         <motion.div
            // whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            whileHover="animate"
            className={styles.notification_container}
            style={{ backgroundColor: theme.card.shade2 }}
         >
            {/* <img src="/dashboard_header/bell.svg" /> */}
            <IconBell color={theme.text.shade1} size={20} />

            <motion.span
               className={styles.count_container}
               style={{ backgroundColor: count ? theme.red : theme.green }}
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
