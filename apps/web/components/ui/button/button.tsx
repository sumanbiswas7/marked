"use client";

import { useTheme } from "../../../hooks/use-theme";
import styles from "./button.module.scss";
import Link from "next/link";

export function Button({ type, onCLick, title, link }: Props): JSX.Element {
   const { theme } = useTheme();

   const customStyles =
      type == "outlined"
         ? {
              backgroundColor: "transparent",
              borderColor: theme.accent,
              color: theme.accent,
           }
         : {
              backgroundColor: theme.accent,
              borderColor: theme.accent,
              color: theme.text.shade3,
           };

   if (link)
      return (
         <Link href={link} onClick={onCLick} className={styles.container} style={customStyles}>
            {title}
         </Link>
      );

   return (
      <button onClick={onCLick} className={styles.container} style={customStyles}>
         {title}
      </button>
   );
}

interface Props {
   type?: "filled" | "outlined";
   onCLick?: () => void;
   title: string;
   bgCol?: string;
   color?: string;
   link?: string;
}
