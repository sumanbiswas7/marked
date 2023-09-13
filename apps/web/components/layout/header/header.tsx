import { THEME } from "../../../theme";
import { NotificationButton } from "../../ui/notification-button/notification-button";
import styles from "./header.module.scss";

export function Header(): JSX.Element {
   return (
      <div
         className={styles.container}
         style={{
            borderColor: THEME.border.shade1,
            backgroundColor: THEME.background,
         }}
      >
         <p>Hello, Suman Biswas</p>
         <NotificationButton count={3} />
      </div>
   );
}
