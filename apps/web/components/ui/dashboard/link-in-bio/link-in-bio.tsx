"use client";

import styles from "./link-in-bio.module.scss";
import { StatsWrapper } from "../stats-wrapper/stats-wrapper";
import Link from "next/link";
import { useTheme } from "../../../../hooks/use-theme";
import { IconClipboard, IconEdit } from "@tabler/icons-react";

export function LinkInBio() {
   const { theme } = useTheme();

   return (
      <StatsWrapper
         title="Link in bio"
         description="Unlock Your Online Presence add Your Social Media Links and Share Them in One Click!  "
      >
         <div className={styles.buttons} style={{ backgroundColor: theme.card.shade2 }}>
            <Link className={styles.btn} href={"/profile"} style={{ color: theme.text.shade1 }}>
               Edit Profile{" "}
               <span>
                  <IconEdit color={theme.text.shade1} size={15} />
               </span>
            </Link>
            <div className={styles.divider} />
            <button className={styles.btn} style={{ color: theme.text.shade1 }}>
               Copy Link{" "}
               <span>
                  <IconClipboard color={theme.text.shade1} size={15} />
               </span>
            </button>
         </div>
      </StatsWrapper>
   );
}
