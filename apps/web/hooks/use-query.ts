import { HttpResponse } from "@marked/utils";
import { useEffect, useState } from "react";

export function useQuery(callApiFunc: (...args: any) => Promise<HttpResponse>) {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState<any>({});

   useEffect(() => {
      callApiFuncAsync();
   }, []);

   async function callApiFuncAsync() {
      const res = await callApiFunc();
      setLoading(false);
      if (res.isError) return setError(true);
      setData(res.data);
   }

   return { loading, data, error };
}

export type QueryResponse<T> = {
   data: T | null;
   error: boolean;
   loading: boolean;
};
