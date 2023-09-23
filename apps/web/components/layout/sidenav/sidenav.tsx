"use client";

import Link from "next/link";
import { SideNavLink } from "./link";
import styles from "./sidenav.module.scss";
import { truncateEmail } from "../../../utils/slice-email";

import { IconLayoutDashboard, IconLink, IconList, IconNotes, IconCreditCard, IconSettings } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";
import { useAuthUser } from "../../../hooks/use-auth-user";

export function SideNav(): JSX.Element {
   const { theme } = useTheme();
   const { error, loading, user } = useAuthUser();

   const customContStyles = {
      borderColor: theme.border.shade1,
      backgroundColor: theme.background,
   };

   const inactvColor = theme.accent;
   const actvColor = theme.text.shade3;
   const iconSize = 20;

   return (
      <div className={styles.main_container} style={customContStyles}>
         {/* Top header with logo and texture */}
         <div
            className={styles.header_top_cont}
            style={{
               backgroundImage:
                  theme.colorScheme === "dark" ? `url("/sidenav/bg_texture.webp")` : `url("/sidenav/bg_texture.webp")`,
            }}
         >
            <Link href="/" className={styles.header_top_cont__logo_cont}>
               <img src="/text-logo.svg" className={styles.logo_big_screen} />
            </Link>

            <img src="/logo_small_screen.svg" className={styles.logo_small_screen} />
         </div>

         {/* Logged User */}
         {loading ? (
            <p>Loading Auth User...</p>
         ) : (
            <>
               {error ? (
                  <p>Err: {error.message}</p>
               ) : (
                  <div
                     className={styles.logged_user_cont}
                     style={{
                        borderColor: theme.colorScheme === "dark" ? theme.border.shade1 : theme.text.shade1,
                     }}
                  >
                     <img src={user?.image || ""} />
                     <div className={styles.logged_user_cont__user_cont}>
                        <h4 style={{ color: theme.text.shade1 }}>{user?.name}</h4>
                        <p style={{ color: theme.text.shade2 }}>{truncateEmail(user?.email || "n/a", 25)}</p>
                     </div>
                  </div>
               )}
            </>
         )}

         {/* Sidenav links */}
         <div className={styles.links_scroll_cont}>
            <SideNavLink
               title="Dashboard"
               to="/dashboard"
               icons={{
                  inactive: <IconLayoutDashboard size={iconSize} color={inactvColor} />,
                  active: <IconLayoutDashboard size={iconSize} color={actvColor} />,
               }}
            />
            <SideNavLink
               title="Saved Links"
               to="/dashboard/categories"
               icons={{
                  active: <IconLink size={iconSize} color={actvColor} />,
                  inactive: <IconLink size={iconSize} color={inactvColor} />,
               }}
            />
            <SideNavLink
               title="Tasks"
               to="/dashboard/tasks"
               icons={{
                  active: <IconList size={iconSize} color={actvColor} />,
                  inactive: <IconList size={iconSize} color={inactvColor} />,
               }}
            />
            <SideNavLink
               title="Notes"
               to="/dashboard/notes"
               icons={{
                  active: <IconNotes size={iconSize} color={actvColor} />,
                  inactive: <IconNotes size={iconSize} color={inactvColor} />,
               }}
            />
            <SideNavLink
               title="Expense Tracker"
               to="/dashboard/expenses"
               icons={{
                  active: <IconCreditCard size={iconSize} color={actvColor} />,
                  inactive: <IconCreditCard size={iconSize} color={inactvColor} />,
               }}
            />
         </div>

         <SideNavLink
            bottom
            title="Settings"
            to="/settings"
            icons={{
               active: <IconSettings size={iconSize} />,
               inactive: <IconSettings size={iconSize} />,
            }}
         />
      </div>
   );
}
