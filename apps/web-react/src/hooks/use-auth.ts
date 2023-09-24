import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { errorNotification, successNotification } from "../utils/show-notifications";

export function useAuth() {
   const [authLoad, setAuthLoad] = useState(true);
   const [authErr, setAuthErr] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const cached = localStorage.getItem("access_token");
      setAuthLoad(false);
      if (!cached) {
         setAuthErr(true);
         errorNotification("User not Authenticated");
         navigate("/auth/login");
      } else {
         successNotification("User Authenticated");
      }
   }, []);

   return { authLoad, authErr };
}
