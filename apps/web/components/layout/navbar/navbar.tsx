import { THEME } from "../../../theme";
import styles from "./navbar.module.scss";
import { Button } from "../../ui/button/button";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

export function NavBar(): JSX.Element {
   return (
      <div
         className={styles.container}
         style={{ borderColor: THEME.border.shade1 }}
      >
         <Link href={"/"}>
            <img src="/text-logo.svg" className={styles.logo} />
         </Link>

         <div className={styles.links_container}>
            <a
               href="https://github.com/sumanbiswas7"
               target="_blank"
               className={styles.github_btn}
               style={{ backgroundColor: THEME.card.shade1 }}
            >
               <IconBrandGithub color={THEME.text.shade1} size={20} />
            </a>
            <Button title="Login" type="outlined" link="/login" />
            <Button title="Sign up" type="filled" link="/signup" />
         </div>
      </div>
   );
}
