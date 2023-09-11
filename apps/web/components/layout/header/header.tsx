import { COLORS } from "../../../theme/colors";
import { NotificationButton } from "../../ui/notification-button/notification-button";
import styles from "./header.module.scss";

export function Header(): JSX.Element {
   return (
      <div
         className={styles.container}
         style={{ borderColor: COLORS.borderSwatch }}
      >
         <p>Hello, Suman Biswas</p>
         <NotificationButton />
      </div>
   );
}
