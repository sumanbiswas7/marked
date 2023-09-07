import { COLORS } from "../theme/colors";
import styles from "./navbar.module.scss";
import { Button } from "../components/button";

export function NavBar(): JSX.Element {
  return (
    <div
      className={styles.container}
      style={{ borderColor: COLORS.borderSwatch }}
    >
      <img src="/text-logo.svg" className={styles.logo} />

      <div className={styles.links_container}>
        <a
          href="https://github.com/sumanbiswas7"
          target="_blank"
          className={styles.github_btn}
          style={{ backgroundColor: COLORS.textLight2Swatch }}
        >
          <img src="/github.svg" className={styles.github_icon} />
        </a>
        <Button title="Login" type="outlined" link="/login" />
        <Button title="Sign up" type="filled" link="/signup" />
      </div>
    </div>
  );
}
