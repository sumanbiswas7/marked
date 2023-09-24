import * as React from "react";
import AuthForm from "../../../components/form/auth/auth-form";
import { AuthLayout } from "../../../components/layout/auth-layout/auth-layout";

import styles from "./login.module.scss";

export default function LoginPage() {
   return (
      <AuthLayout>
         <div className={styles.main_container}>
            {/* Log in box */}
            <AuthForm type="login" />
         </div>
      </AuthLayout>
   );
}
