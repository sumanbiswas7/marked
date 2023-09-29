import axios from "axios";
import { getAccessToken } from "../../utils/get-token";
import { HTTP_STATUS, HttpResponse } from "@marked/utils";
import { BASE_URL } from "../../constants/base-url";

export async function getBioFromEmail(email: string | null): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const res = await axios.get(`${BASE_URL}/user/bio/${email}`);
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) throw new HttpResponse(httpRes);

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
