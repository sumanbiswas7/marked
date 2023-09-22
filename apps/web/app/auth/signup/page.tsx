"use client";

import { AuthForm } from "../../../components/form/auth/auth-form";
import styles from "./signup.module.scss";

export default function SignupPage() {
   return (
      <div className={styles.main_container}>
         {/* Sign up box */}
         <AuthForm type="signup" />
      </div>
   );
}
