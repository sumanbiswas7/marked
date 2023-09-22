"use client";

import Link from "next/link";
import { useTheme } from "../../../hooks/use-theme";
import styles from "./auth-form.module.scss";
import { motion } from "framer-motion";

export function AuthForm({ type }: Props) {
   const { theme } = useTheme();

   return (
      <div className={styles.container} style={{ color: theme.text.shade1, backgroundColor: theme.background }}>
         {/* <img src="/auth/marked-logo.png" className={styles.logo} /> */}

         <h4>{type == "signup" ? "Create your account" : "Sign in"}</h4>
         <p style={{ color: theme.text.shade2 }}>to continue to marked</p>

         {/* Provider buttons */}
         <div className={styles.provider_btn_cont}>
            <motion.button whileHover={{ x: 5 }} whileTap={{ x: 0 }} style={{ borderColor: theme.border.shade1 }}>
               <img src="/auth/google.svg" /> <span style={{ color: theme.text.shade1 }}>Continue with Google</span>
            </motion.button>
            <motion.button whileHover={{ x: 5 }} whileTap={{ x: 0 }} style={{ borderColor: theme.border.shade1 }}>
               <img src="/auth/github.svg" /> <span style={{ color: theme.text.shade1 }}>Continue with Github</span>
            </motion.button>
         </div>

         <p style={{ color: theme.text.shade2 }} className={styles.bottom_txt}>
            {type === "login" ? "No account? " : "Have an account? "}
            <span>
               {type === "signup" ? (
                  <Link style={{ color: theme.text.shade1 }} href="/auth/login">
                     Sign in
                  </Link>
               ) : (
                  <Link style={{ color: theme.text.shade1 }} href="/auth/signup">
                     Sign up
                  </Link>
               )}
            </span>
         </p>
      </div>
   );
}

interface Props {
   type: "signup" | "login";
}
