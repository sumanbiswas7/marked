import { THEME } from "../../../theme/colors";
import styles from "./navbar.module.scss";
import { Button } from "../../ui/button/button";
import Link from "next/link";

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
               <img src="/navbar/github.svg" className={styles.github_icon} />
            </a>
            <Button title="Login" type="outlined" link="/login" />
            <Button title="Sign up" type="filled" link="/signup" />
         </div>
      </div>
   );
}
