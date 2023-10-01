"use client";

import Link from "next/link";
import { useTheme } from "../../../hooks/use-theme";
import styles from "./auth-form.module.scss";
import { motion } from "framer-motion";
import { IResolveParams, LoginSocialGoogle, objectType } from "reactjs-social-login";
import { useState } from "react";
import { errorNotification, successNotification } from "../../../utils/show-notifications";
import { LoadingOverlay } from "@mantine/core";
import { oauthRegister } from "../../../utils/api/auth/oauth-register";
import { setCache, setToken } from "../../../utils/get-token";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: Props) {
   const [loading, setLoading] = useState(false);
   const { theme } = useTheme();
   const route = useRouter();

   function handleReject(reject: string | objectType) {
      setLoading(false);
      if (typeof reject === "string") errorNotification(reject);
      else errorNotification(`Opps! ${type} cancelled`);
   }

   async function handleResolve({ data }: IResolveParams) {
      const res = data as any;
      const email = res?.email;
      const name = res?.name;
      const image = res?.picture;
      if (!email || !name) return errorNotification(`Opps! Something went wrong`);

      const httpRes = await oauthRegister({ email, name, image });

      if (httpRes.isError) {
         setLoading(false);
         return errorNotification(httpRes.message || `Unable to perform ${type}`);
      }

      const token = (httpRes.data as any).token;
      const user = (httpRes.data as any).user;
      localStorage.clear();

      if (token && user) {
         // Success case: Both token and user exist
         setToken(token);
         successNotification(`${type} successfull`);
         setLoading(false);
         route.push("/dashboard");
      } else {
         // Error case: Either token or user is missing
         setLoading(false);
         return errorNotification(`Unable to perform ${type}`);
      }
   }

   return (
      <div className={styles.container} style={{ color: theme.text.shade1, backgroundColor: theme.background }}>
         {/* <img src="/auth/marked-logo.png" className={styles.logo} /> */}
         <LoadingOverlay visible={loading} />

         <h4>{type == "signup" ? "Create your account" : "Sign in"}</h4>
         <p style={{ color: theme.text.shade2 }}>to continue to marked</p>

         {/* Provider buttons */}
         <div className={styles.provider_btn_cont}>
            <LoginSocialGoogle
               onLoginStart={() => setLoading(true)}
               client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "n/a"}
               onReject={handleReject}
               onResolve={handleResolve}
               scope="https://www.googleapis.com/auth/userinfo.email"
            >
               <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                  style={{ borderColor: theme.border.shade1 }}
                  className={styles.btn}
               >
                  <img src="/auth/google.svg" /> <span style={{ color: theme.text.shade1 }}>Continue with Google</span>
               </motion.button>
            </LoginSocialGoogle>

            {/* Github Provider */}
            {/* <motion.button
               whileHover={{ x: 5 }}
               whileTap={{ x: 0 }}
               style={{ borderColor: theme.border.shade1 }}
               className={styles.btn}
            >
               <img src="/auth/github.svg" /> <span style={{ color: theme.text.shade1 }}>Continue with Github</span>
            </motion.button> */}
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
