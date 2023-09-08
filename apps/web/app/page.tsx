import styles from "./page.module.scss";
import { NavBar } from "../components/navbar";
import { COLORS } from "../theme/colors";
import { Button } from "../components/button";

export default function Page(): JSX.Element {
  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        <div className={styles.left_container}>
          <div className={styles.txt_container}>
            <p style={{ color: COLORS.textLightSwatch }}>INTRODUCING</p>
            <p style={{ color: COLORS.textSwatch }}>Your all in one</p>
            <p style={{ color: COLORS.textSwatch }}>
              <span style={{ color: COLORS.green }}>Productivity </span>
              Powerhouse
            </p>
            <p style={{ color: COLORS.textLightSwatch }}>
              Streamline Your Life with an All-in-One Solution for
              <span style={{ color: COLORS.textSwatch }}> Link </span>
              Management,
              <span style={{ color: COLORS.textSwatch }}> Task </span>Tracking,
              <span style={{ color: COLORS.textSwatch }}> Note </span> Taking
              and <span style={{ color: COLORS.textSwatch }}> Expense </span>
              Tracking
            </p>
            <div style={{ marginTop: "1rem" }} className={styles.btn_free_cont}>
              <Button title="Get Started" />
              <FreeToUse />
            </div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.bg_img_cont} />
          <img src="/home/demo-image-800px.webp" className={styles.demo_img} />
        </div>
      </div>
    </div>
  );
}

function FreeToUse() {
  return (
    <div className={styles.freeuse_cont}>
      <img src="/home/left_focus.svg" />
      <p style={{ color: COLORS.textLightSwatch }}>
        FREE TO USE
        <br /> NO CARDS
      </p>
      <img src="/home/right_focus.svg" />
    </div>
  );
}
