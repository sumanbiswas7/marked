import axios from "axios";
import { getAccessToken } from "../../utils/get-token";
import { HTTP_STATUS, HttpResponse } from "@marked/utils";
import { BASE_URL } from "../../constants/base-url";

export async function deleteLinkById(linkId: string, categoryId: string): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const token = getAccessToken();

   if (token.error) {
      error.status = HTTP_STATUS.NOT_FOUND;
      error.message = token.message || "No access token found";
      throw new HttpResponse(error);
   }

   if (!linkId) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = "No link id found";
      throw new HttpResponse(error);
   }

   const config = { headers: { access_token: token.token }, data: { categoryId } };
   const res = await axios.delete(`${BASE_URL}/link/${linkId}`, config);
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) throw new HttpResponse(httpRes);

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
