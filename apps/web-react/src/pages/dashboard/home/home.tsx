import * as React from "react";
import { DashboardLayout } from "../../../components/layout/dashboard-layout/dashboard-layout";
import styles from "./home.module.scss";

export default function DashboardHomePage(): JSX.Element {
   return (
      <DashboardLayout>
         <div>
            <h1>Dashboard</h1>
            <p>Conming Soon...</p>
         </div>
      </DashboardLayout>
   );
}
