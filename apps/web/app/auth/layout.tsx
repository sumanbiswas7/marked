import styles from "./layout.module.scss";

export default function DashboardPage({ children }): JSX.Element {
   return (
      <>
         <div className={styles.main}>
            <div className={styles.content} />
         </div>
         {children}
      </>
   );
}
