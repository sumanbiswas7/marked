import axios from "axios";
import { getAccessToken } from "../../get-token";
import { HTTP_STATUS, HttpResponse } from "@marked/utils";
import { BASE_URL } from "../../../constants/base-url";

export async function deleteCategoryById(categoryId: string): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const token = getAccessToken();

   if (token.error) {
      error.status = HTTP_STATUS.NOT_FOUND;
      error.message = token.message || "No access token found";
      throw new HttpResponse(error);
   }

   const res = await axios.delete(`${BASE_URL}/category/${categoryId}`, { headers: { access_token: token.token } });
   const httpRes = res.data as HttpResponse;
   if (httpRes.isError) throw new HttpResponse(httpRes);

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
