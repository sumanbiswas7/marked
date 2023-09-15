"use client";

import { useTheme } from "../../../hooks/use-theme";
import { getGreeting } from "../../../utils/greet";
import { NotificationButton } from "../../ui/notification-button/notification-button";
import { ToggleThemeButton } from "../../ui/toggle-theme-button/toggle-theme-button";
import styles from "./header.module.scss";

export function Header(): JSX.Element {
   const { theme } = useTheme();

   return (
      <div
         className={styles.container}
         style={{
            borderColor: theme.border.shade1,
            backgroundColor: theme.background,
         }}
      >
         <p style={{ color: theme.text.shade1 }}>
            {getGreeting()} <span className={styles.name}>Suman Biswas</span>
         </p>

         <div className={styles.theme_noti_cont}>
            <ToggleThemeButton />
            <NotificationButton count={3} />
         </div>
      </div>
   );
}
