import { COLORS } from "../../../theme/colors";
import { SideNavLink } from "./link";
import styles from "./sidenav.module.scss";

export function SideNav(): JSX.Element {
   const customContStyles = { borderColor: COLORS.borderSwatch };

   return (
      <div className={styles.main_container} style={customContStyles}>
         {/* Top header with logo and texture */}
         <div className={styles.header_top_cont}>
            <div className={styles.header_top_cont__logo_cont}>
               <img src="/text-logo.svg" />
            </div>
         </div>

         {/* Logged User */}
         <div
            className={styles.logged_user_cont}
            style={{ borderColor: COLORS.textSwatch }}
         >
            <img src="/sidenav/logged_user.png" />
            <div className={styles.logged_user_cont__user_cont}>
               <h4 style={{ color: COLORS.textSwatch }}>Suman Biswas</h4>
               <p style={{ color: COLORS.textLightSwatch }}>
                  sumanbiswas@gmail.com
               </p>
            </div>
         </div>

         {/* Sidenav links */}
         <SideNavLink title="Dashboard" to="/dashboard" />
         <SideNavLink title="Saved Links" to="/dashboard/links" />
         <SideNavLink title="Tasks" to="/dashboard/tasks" />
         <SideNavLink title="Notes" to="/dashboard/notes" />
         <SideNavLink title="Expense Tracker" to="/dashboard/expense" />
      </div>
   );
}
