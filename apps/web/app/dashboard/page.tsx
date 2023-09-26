"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";
import { Clock } from "../../components/ui/clock/clock";
import { CountLinkButton } from "../../components/ui/dashboard/count-link-button/count-link-button";
import { DailyTasks } from "../../components/ui/dashboard/daily-tasks-stat/daily-tasks-stat";

export default function DashboardPage(): JSX.Element {
   return (
      <div className={styles.main_container}>
         <div className={styles.left_container}>
            {/* Top row two link buttons */}
            <div className={styles.top_row}>
               <CountLinkButton count={12} title="Notes" description="View your notes" href="/dashboard/notes" />
               <CountLinkButton
                  count={4}
                  title="Saved Links"
                  description="View saved links"
                  href="/dashboard/categories"
               />
            </div>
            {/* Left side stats */}
            <DailyTasks />
         </div>
         <div className={styles.right_container}>
            <Clock />
         </div>
      </div>
   );
}
