"use client";

import React from "react";
import { useTheme } from "../../../../hooks/use-theme";
import styles from "./stats-wrapper.module.scss";
import { IconThumbDownFilled, IconThumbUpFilled } from "@tabler/icons-react";

export function StatsWrapper({ children, description, title, impression }: Props) {
   const { theme } = useTheme();

   return (
      <div
         className={styles.container}
         style={{ borderColor: theme.border.shade3, backgroundColor: theme.card.shade3 }}
      >
         <div className={styles.top_row}>
            <div>
               <p className={styles.title} style={{ color: theme.text.shade1 }}>
                  {title}
               </p>
               <p style={{ color: theme.text.shade2 }}>{description}</p>
            </div>
            {impression && impression === "good" ? (
               <div className={styles.impression} style={{ backgroundColor: theme.green }}>
                  <IconThumbUpFilled color={theme.text.shade3} size={15} />
               </div>
            ) : (
               <div className={styles.impression} style={{ backgroundColor: theme.green }}>
                  <IconThumbDownFilled color={theme.text.shade3} size={15} />
               </div>
            )}
         </div>
         {children}
      </div>
   );
}

interface Props {
   children: React.ReactNode;
   title: string;
   description: string;
   impression: "good" | "bad";
}
