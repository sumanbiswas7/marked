import styles from "./signup.module.scss";
import AuthForm from "../../../components/form/auth/auth-form";
import { AuthLayout } from "../../../components/layout/auth-layout/auth-layout";

export default function SignupPage() {
   return (
      <AuthLayout>
         <div className={styles.main_container}>
            {/* Sign up box */}
            <AuthForm type="signup" />
         </div>
      </AuthLayout>
   );
}
