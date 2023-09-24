"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { errorNotification, successNotification } from "../utils/show-notifications";

export function useAuth() {
   const [authLoad, setAuthLoad] = useState(true);
   const [authErr, setAuthErr] = useState(false);
   const route = useRouter();

   useEffect(() => {
      const cached = localStorage.getItem("access_token");
      setAuthLoad(false);
      if (!cached) {
         setAuthErr(true);
         errorNotification("User not Authenticated");
         route.replace("/auth/login");
      } else {
         successNotification("User Authenticated");
      }
   }, []);

   return { authLoad, authErr };
}
