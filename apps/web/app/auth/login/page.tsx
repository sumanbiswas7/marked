"use client";

import dynamic from "next/dynamic";
// import { AuthForm } from "../../../components/form/auth/auth-form";
const DynamicAuthForm = dynamic(() => import("../../../components/form/auth/auth-form"), {
   loading: () => <p>Loading...</p>,
   ssr: false,
});

import styles from "./login.module.scss";

export default function LoginPage() {
   return (
      <div className={styles.main_container}>
         {/* Log in box */}
         <DynamicAuthForm type="login" />
      </div>
   );
}
