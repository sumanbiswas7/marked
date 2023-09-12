import Link from "next/link";
import { COLORS } from "../../../theme/colors";
import { SideNavLink } from "./link";
import styles from "./sidenav.module.scss";
import { truncateEmail } from "../../../utils/slice-email";

export function SideNav(): JSX.Element {
   const customContStyles = { borderColor: COLORS.borderSwatch };

   return (
      <div className={styles.main_container} style={customContStyles}>
         {/* Top header with logo and texture */}
         <div className={styles.header_top_cont}>
            <Link href="/" className={styles.header_top_cont__logo_cont}>
               <img src="/text-logo.svg" />
            </Link>
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
                  {truncateEmail("sumanbiswas842001@gmail.com", 25)}
               </p>
            </div>
         </div>

         {/* Sidenav links */}
         <div className={styles.links_scroll_cont}>
            <SideNavLink
               title="Dashboard"
               to="/dashboard"
               icons={{
                  inactive: "/sidenav/icons/dashboard-dark.svg",
                  active: "/sidenav/icons/dashboard-light.svg",
               }}
            />
            <SideNavLink
               title="Saved Links"
               to="/dashboard/links"
               icons={{
                  inactive: "/sidenav/icons/links-dark.svg",
                  active: "/sidenav/icons/links-light.svg",
               }}
            />
            <SideNavLink
               title="Tasks"
               to="/dashboard/tasks"
               icons={{
                  inactive: "/sidenav/icons/tasks-dark.svg",
                  active: "/sidenav/icons/tasks-light.svg",
               }}
            />
            <SideNavLink
               title="Notes"
               to="/dashboard/notes"
               icons={{
                  inactive: "/sidenav/icons/notes-dark.svg",
                  active: "/sidenav/icons/notes-light.svg",
               }}
            />
            <SideNavLink
               title="Expense Tracker"
               to="/dashboard/expenses"
               icons={{
                  inactive: "/sidenav/icons/expenses-dark.svg",
                  active: "/sidenav/icons/expenses-light.svg",
               }}
            />
         </div>

         <SideNavLink
            bottom
            title="Settings"
            to="/settings"
            icons={{
               inactive: "/sidenav/icons/settings-dark.svg",
               active: "/sidenav/icons/settings-light.svg",
            }}
         />
      </div>
   );
}
