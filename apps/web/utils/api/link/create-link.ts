import axios from "axios";
import { getAccessToken } from "../../get-token";
import { HTTP_STATUS, HttpResponse } from "@marked/utils";
import { BASE_URL } from "../../../constants/base-url";

export async function addNewLink(form: any): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const token = getAccessToken();

   const categoryId = form.categoryId;
   const title = form.title;
   const link = form.link;

   if (!categoryId || !title || !link) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = `CategoryId, link and title is required but got ${categoryId},${link},${title}`;
      error.data = { categoryId, link, title };
      throw new HttpResponse(error);
   }

   if (categoryId?.length < 10) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = "Given categoryId is not valid";
      throw new HttpResponse(error);
   }

   if (token.error) {
      error.status = HTTP_STATUS.NOT_FOUND;
      error.message = token.message || "No access token found";
      throw new HttpResponse(error);
   }

   const config = { headers: { access_token: token.token } };
   const res = await axios.post(`${BASE_URL}/link/create`, { categoryId, link, title }, config);
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) throw new HttpResponse(httpRes);

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
