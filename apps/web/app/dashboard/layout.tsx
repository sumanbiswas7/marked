import { Header } from "../../components/layout/header/header";
import { SideNav } from "../../components/layout/sidenav/sidenav";
import { COLORS } from "../../theme/colors";
import styles from "./layout.module.scss";

export default function DashboardPage({ children }): JSX.Element {
   return (
      <div className={styles.container}>
         <SideNav />
         <div className={styles.right_cont}>
            <Header />
            <div className={styles.child_container}>{children}</div>
         </div>
      </div>
   );
}
