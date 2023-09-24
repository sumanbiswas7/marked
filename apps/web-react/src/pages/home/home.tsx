import styles from "./page.module.scss";
import { Contact } from "@marked/ui";
import { Button } from "../../components/ui/button/button";
import { NavBar } from "../../components/layout/navbar/navbar";
import { useTheme } from "../../hooks/use-theme";

export default function HomePage(): JSX.Element {
   const { theme } = useTheme();

   return (
      <div style={{ backgroundColor: theme.background }} className={styles.body_cont}>
         <NavBar />
         <div className={styles.main_container}>
            <div className={styles.left_container}>
               {/* Header and paras */}
               <div className={styles.txt_container}>
                  <p style={{ color: theme.text.shade2 }}>INTRODUCING</p>
                  <p style={{ color: theme.text.shade1 }}>
                     Your{" "}
                     <span className={styles.all_in_one_txt}>
                        <img src="/home/left_quote.svg" className={styles.left_quote} />
                        all in one
                        <img src="/home/right_quote.svg" className={styles.right_quote} />
                     </span>
                  </p>
                  <p style={{ color: theme.text.shade1 }}>
                     <span style={{ color: theme.green }}>Productivity </span>
                     Powerhouse
                  </p>
                  <p style={{ color: theme.text.shade2 }}>
                     Streamline Your Life with an All-in-One Solution for
                     <span style={{ color: theme.accent }}> Link </span>
                     Management,
                     <span style={{ color: theme.accent }}> Task </span>
                     Tracking,
                     <span style={{ color: theme.accent }}> Note </span> Taking and{" "}
                     <span style={{ color: theme.accent }}> Expense </span>
                     Tracking - All with Handy
                     <span style={{ color: theme.accent }}> Reminders</span>.
                  </p>
                  <div style={{ marginTop: "1rem" }} className={styles.btn_free_cont}>
                     <Button title="Get Started" link="/dashboard" />
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

         <div style={{ marginTop: "1rem" }}>
            <Contact
               bgCol={theme.accent}
               color={theme.text.shade2}
               headerCol={theme.text.shade3}
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
      </div>
   );
}

function FreeToUse(): JSX.Element {
   const { theme } = useTheme();

   return (
      <div className={styles.freeuse_cont}>
         <img src="/home/left_focus.svg" />
         <p style={{ color: theme.text.shade2 }}>
            FREE TO USE
            <br /> NO CARDS
         </p>
         <img src="/home/right_focus.svg" />
      </div>
   );
}

function Copyright() {
   const { theme } = useTheme();

   return (
      <div className={styles.copyright_cont} style={{ color: theme.text.shade2 }}>
         <p>Copyright</p>
         <p>
            ©{" "}
            <span>
               <a href="https://www.linkedin.com/in/sumanbiswas7" target="_blank" style={{ color: theme.text.shade2 }}>
                  Suman Biswas
               </a>
            </span>
            , 2023
         </p>
      </div>
   );
}
