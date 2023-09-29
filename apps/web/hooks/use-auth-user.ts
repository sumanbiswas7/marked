import { useContext, useEffect, useState } from "react";
import { AuthUserContext, UserMe } from "../components/provider/auth-user-provider";
import { getAuthUser } from "../api/auth/get-user";
import { HttpResponse } from "@marked/utils";

export function useAuthUser() {
   const [user, setUser] = useState<UserMe | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<HttpResponse | null>(null);

   const userctx = useContext(AuthUserContext);

   useEffect(() => {
      if (userctx?.user) {
         setStateAuthUser();
      } else {
         getAuthUserFromApi();
      }
   }, []);

   async function getAuthUserFromApi() {
      const httpRes = await getAuthUser();
      //REVIEW: Improve me
      if (httpRes.isError) setError(httpRes);
      const fetchedUser = (httpRes.data as any).user as UserMe;
      if (fetchedUser) setUser(fetchedUser);
      setLoading(false);
   }

   function setStateAuthUser() {
      const curUser = userctx?.user as UserMe;
      setUser(curUser);
      setLoading(false);
   }

   async function revalidate() {
      await getAuthUserFromApi();
   }

   return { user, error, loading, revalidate };
}
