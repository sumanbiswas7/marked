import axios from "axios";
import { getAccessToken } from "../../utils/get-token";
import { HTTP_STATUS, HttpResponse } from "@marked/utils";
import { BASE_URL } from "../../constants/base-url";

export async function createCategory(data: any): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const token = getAccessToken();

   if (token.error) {
      error.status = HTTP_STATUS.NOT_FOUND;
      error.message = token.message || "No access token found";
      return error;
   }

   const res = await axios.post(`${BASE_URL}/category/create`, data, { headers: { access_token: token.token } });
   const httpRes = res.data as HttpResponse;

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
