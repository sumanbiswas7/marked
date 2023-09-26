"use client";

import styles from "./notification-stats.module.scss";
import { IconBellCancel } from "@tabler/icons-react";
import { StatsWrapper } from "../stats-wrapper/stats-wrapper";
import { useTheme } from "../../../../hooks/use-theme";

export function NotificationStats() {
   const { theme } = useTheme();

   return (
      <StatsWrapper title="Notifications">
         <div className={styles.container}>
            <IconBellCancel size={70} color={theme.text.shade2} />
            <p style={{ color: theme.text.shade2 }}>Seems like you don’t have any reminders :) </p>
         </div>
      </StatsWrapper>
   );
}
