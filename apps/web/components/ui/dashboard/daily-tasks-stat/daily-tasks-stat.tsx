"use client";

import styles from "./daily-tasks-stat.module.scss";
import { StatsWrapper } from "../stats-wrapper/stats-wrapper";
import { useTheme } from "../../../../hooks/use-theme";

const DUMMY_TASKS = [
   {
      title: "Go to Shopping",
      completed: true,
   },
   {
      title: "Watch Barbie",
      completed: true,
   },
   {
      title: "Read bun.sh docs",
      completed: false,
   },
   {
      title: "Go shopping",
      completed: false,
   },
];

export function DailyTasks() {
   const { theme } = useTheme();

   return (
      <StatsWrapper
         title="Daily Tasks"
         description="Seems like you have completed most of your daily tasks :)"
         impression="good"
      >
         <div className={styles.container}>
            <DonutChart value={78.63} />
            <div className={styles.task_table} style={{ borderColor: theme.border.shade1 }}>
               {DUMMY_TASKS.slice(0, 4).map((task) => (
                  <div className={styles.task} style={{ borderColor: theme.border.shade1 }}>
                     <p className={styles.task_title}>{task.title}</p>
                     <div
                        className={styles.dot}
                        style={{ backgroundColor: task.completed ? theme.green : theme.red }}
                     />
                  </div>
               ))}
            </div>
         </div>
      </StatsWrapper>
   );
}

function DonutChart({ value }: { value: number }) {
   const { theme } = useTheme();
   const background = `radial-gradient(closest-side, ${theme.card.shade3} 79%, transparent 80% 100%), conic-gradient(${theme.accent} ${value}%, ${theme.text.shade2} 0)`;

   return (
      <div className={styles.progress} style={{ background }}>
         <progress style={{ visibility: "hidden", width: 0, height: 0 }}></progress>
         <span className={styles.number} style={{ color: theme.accent }}>
            {Math.floor(value)}%
         </span>
      </div>
   );
}
