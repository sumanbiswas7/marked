"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";

export default function DashboardPage(): JSX.Element {
   return (
      <div>
         <h1>Dashboard</h1>
         <p>Conming Soon...</p>
      </div>
   );
}
