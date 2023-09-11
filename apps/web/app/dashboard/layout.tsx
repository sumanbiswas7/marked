import { SideNav } from "../../components/layout/sidenav/sidenav";
import { COLORS } from "../../theme/colors";
import styles from "./layout.module.scss";

export default function DashboardPage({ children }): JSX.Element {
   return (
      <div className={styles.container}>
         <SideNav />
         <div className={styles.right_cont}>
            <div
               className={styles.header_mock}
               style={{ borderColor: COLORS.borderSwatch }}
            />
            <div className={styles.child_container}>{children}</div>
         </div>
      </div>
   );
}
