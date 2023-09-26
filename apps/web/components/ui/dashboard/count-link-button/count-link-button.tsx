"use client";

import { useTheme } from "../../../../hooks/use-theme";
import styles from "./count-link-button.module.scss";
import Link from "next/link";

export function CountLinkButton({ href, count, description, title }: Props) {
   const { theme } = useTheme();

   return (
      <Link href={href} className={styles.container} style={{ backgroundColor: theme.accent }}>
         <p style={{ color: theme.text.shade3 }}>{title}</p>
         <p style={{ color: theme.text.shade2 }}>{description}</p>

         <span className={styles.count} style={{ backgroundColor: theme.text.shade2, color: theme.text.shade1 }}>
            {count}
         </span>
      </Link>
   );
}

interface Props {
   title: string;
   description: string;
   href: string;
   count: number;
}
