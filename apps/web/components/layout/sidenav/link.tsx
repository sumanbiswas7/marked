"use client";

import Link from "next/link";
import styles from "./link.module.scss";
import { useState } from "react";
import { COLORS } from "../../../theme/colors";
import { usePathname } from "next/navigation";

export function SideNavLink({ to, title }: Props): JSX.Element {
   const [hover, setHover] = useState(false);
   const pathname = usePathname();

   const style = {
      backgroundColor: pathname === to ? COLORS.textSwatch : "transparent",
      color: pathname === to ? COLORS.textLight2Swatch : COLORS.textSwatch,
   };

   return (
      <Link
         href={to}
         className={styles.container}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         style={style}
      >
         {title}
      </Link>
   );
}

interface Props {
   to: string;
   title: string;
}
