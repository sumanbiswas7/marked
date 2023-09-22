"use client";

import { AuthForm } from "../../../components/form/auth/auth-form";
import styles from "./login.module.scss";

export default function LoginPage() {
   return (
      <div className={styles.main_container}>
         {/* Log in box */}
         <AuthForm type="login" />
      </div>
   );
}
