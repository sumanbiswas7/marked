import axios from "axios";
import { getAccessToken } from "../../get-token";
import { HTTP_STATUS, HttpResponse, isValidUrl } from "@marked/utils";
import { BASE_URL } from "../../../constants/base-url";

export async function addOtherSocialLink(form: Form): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const token = getAccessToken();

   if (token.error) {
      error.status = HTTP_STATUS.NOT_FOUND;
      error.message = token.message || "No access token found";
      throw new HttpResponse(error);
   }

   if (!form.socialId) {
      error.message = `No socialId provided`;
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw new HttpResponse(error);
   }

   if (!form.title) {
      error.message = `No title provided`;
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw new HttpResponse(error);
   }

   if (!form.link) {
      error.message = `No link provided`;
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw new HttpResponse(error);
   }

   if (isValidUrl(form.link) === false) {
      error.message = `Given link is not valid`;
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw new HttpResponse(error);
   }

   const config = { headers: { access_token: token.token } };
   const res = await axios.post(`${BASE_URL}/social/add/other-link`, form, config);
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) throw new HttpResponse(httpRes);

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}

interface Form {
   link: string | null;
   title: string | null;
   socialId: string;
}
