"use client";

import styles from "./navbar.module.scss";
import { Button } from "../../ui/button/button";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";

export function NavBar(): JSX.Element {
   const { theme } = useTheme();

   return (
      <div
         className={styles.container}
         style={{ borderColor: theme.border.shade1 }}
      >
         <Link href={"/"}>
            <img src="/text-logo.svg" className={styles.logo} />
         </Link>

         <div className={styles.links_container}>
            <a
               href="https://github.com/sumanbiswas7"
               target="_blank"
               className={styles.github_btn}
               style={{ backgroundColor: theme.card.shade1 }}
            >
               <IconBrandGithub color={theme.text.shade1} size={20} />
            </a>
            <Button title="Login" type="outlined" link="/login" />
            <Button title="Sign up" type="filled" link="/signup" />
         </div>
      </div>
   );
}
