import styles from "./page.module.scss";
import { NavBar } from "../components/navbar";
import { COLORS } from "../theme/colors";
import { Button } from "../components/button";
import { Contact } from "ui/components";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        <div className={styles.left_container}>
          {/* Header and paras */}
          <div className={styles.txt_container}>
            <p style={{ color: COLORS.textLightSwatch }}>INTRODUCING</p>
            <p style={{ color: COLORS.textSwatch }}>
              Your{" "}
              <span className={styles.all_in_one_txt}>
                <img src="/home/left_quote.svg" className={styles.left_quote} />
                all in one
                <img
                  src="/home/right_quote.svg"
                  className={styles.right_quote}
                />
              </span>
            </p>
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
              Tracking - All with Handy
              <span style={{ color: COLORS.textSwatch }}> Reminders</span>.
            </p>
            <div style={{ marginTop: "1rem" }} className={styles.btn_free_cont}>
              <Button title="Get Started" />
              <FreeToUse />
            </div>
            <Copyright />
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.bg_img_cont} />
          <img src="/home/demo-image-800px.webp" className={styles.demo_img} />
        </div>
      </div>

      <Contact
        bgCol={COLORS.textSwatch}
        color={COLORS.textLightSwatch}
        icons={{ email: "/home/email.svg", location: "/home/pin.svg" }}
        me="/home/me.png"
        socials={{
          ig: {
            img: "/home/instagram.svg",
            link: "https://www.instagram.com/sumanbiswas7",
          },
          gh: {
            img: "/home/github.svg",
            link: "https://github.com/sumanbiswas7",
          },
          fb: {
            img: "/home/facebook.svg",
            link: "https://www.facebook.com/people/Suman-Biswas/100009266254381",
          },
        }}
      />
    </div>
  );
}

function FreeToUse(): JSX.Element {
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

function Copyright() {
  return (
    <div
      className={styles.copyright_cont}
      style={{ color: COLORS.textLightSwatch }}
    >
      <p>Copyright</p>
      <p>
        ©{" "}
        <span>
          <a
            href="https://www.linkedin.com/in/sumanbiswas7"
            target="_blank"
            style={{ color: COLORS.textLightSwatch }}
          >
            Suman Biswas
          </a>
        </span>
        , 2023
      </p>
    </div>
  );
}
