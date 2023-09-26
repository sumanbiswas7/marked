"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";
import { Clock } from "../../components/ui/clock/clock";
import { DashboardCountLinkButton } from "../../components/ui/dashboard-count-link-button/dashboard-count-link-button";

export default function DashboardPage(): JSX.Element {
   return (
      <div className={styles.main_container}>
         <div className={styles.left_container}>
            <div className={styles.top_row}>
               <DashboardCountLinkButton
                  count={12}
                  title="Notes"
                  description="View your notes"
                  href="/dashboard/notes"
               />
               <DashboardCountLinkButton
                  count={12}
                  title="Saved Links"
                  description="View saved links"
                  href="/dashboard/categories"
               />
            </div>
         </div>
         <div className={styles.right_container}>
            <Clock />
         </div>
      </div>
   );
}
