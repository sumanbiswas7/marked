import * as React from "react";
import AuthForm from "../../../components/form/auth/auth-form";
import { AuthLayout } from "../../../components/layout/auth-layout/auth-layout";

import styles from "./login.module.scss";
import { HTTP_STATUS } from "@marked/utils";

export default function LoginPage() {
   console.log(HTTP_STATUS);

   return (
      <AuthLayout>
         <div className={styles.main_container}>
            {/* Log in box */}
            <AuthForm type="login" />
         </div>
      </AuthLayout>
   );
}
