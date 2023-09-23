"use client";

import { Header } from "../../components/layout/header/header";
import { SideNav } from "../../components/layout/sidenav/sidenav";
import { useAuth } from "../../hooks/use-auth";
import { useTheme } from "../../hooks/use-theme";
import styles from "./layout.module.scss";

export default function DashboardPage({ children }): JSX.Element {
   const { theme } = useTheme();
   const { authErr, authLoad } = useAuth();

   if (authLoad) return <p>Loading...</p>;
   if (authErr) return <p>Not permitted</p>;

   return (
      <div className={styles.container} style={{ backgroundColor: theme.background }}>
         <SideNav />
         <div className={styles.right_cont}>
            <Header />
            <div className={styles.child_container}>{children}</div>
         </div>
      </div>
   );
}
