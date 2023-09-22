"use client";

import dynamic from "next/dynamic";
import styles from "./signup.module.scss";

// import { AuthForm } from "../../../components/form/auth/auth-form";
const DynamicAuthForm = dynamic(() => import("../../../components/form/auth/auth-form"), {
   loading: () => <p>Loading...</p>,
   ssr: false,
});

export default function SignupPage() {
   return (
      <div className={styles.main_container}>
         {/* Sign up box */}
         <DynamicAuthForm type="signup" />
      </div>
   );
}
