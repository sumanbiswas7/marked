import * as React from "react";
import styles from "./auth-layout.module.scss";

export function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <>
         <div className={styles.main}>
            <div className={styles.content} />
         </div>
         {children}
      </>
   );
}
