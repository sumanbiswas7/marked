"use client";

import { useTheme } from "../../../hooks/use-theme";
import styles from "./signin.module.scss";

export default function SignInPage() {
   const { theme } = useTheme();

   return (
      <div className={styles.main_container}>
         {/* Signup box */}
         <div className={styles.container} style={{ color: theme.text.shade1, backgroundColor: theme.background }}>
            <img src="/auth/marked-logo.png" className={styles.logo} />

            <h4>Create your account</h4>
            <p style={{ color: theme.text.shade2 }}>to continue to marked</p>

            {/* Provider buttons */}
            <div className={styles.provider_btn_cont}>
               <button style={{ borderColor: theme.border.shade1 }}>
                  <img src="/auth/google.svg" />
               </button>
               <button style={{ borderColor: theme.border.shade1 }}>
                  <img src="/auth/github.svg" />
               </button>
            </div>

            <p style={{ color: theme.text.shade2 }} className={styles.bottom_txt}>
               Have an account?{" "}
               <span>
                  <a style={{ color: theme.text.shade1 }} href="/signin">
                     Sign in
                  </a>
               </span>
            </p>
         </div>
      </div>
   );
}
