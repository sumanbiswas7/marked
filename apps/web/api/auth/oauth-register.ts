import axios from "axios";
import { HTTP_STATUS, HttpResponse, isValidEmail, isValidUrl } from "@marked/utils";
import { BASE_URL } from "../../constants/base-url";

export async function oauthRegister(form: { email: string; name: string; image: string }): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });

   const email = form.email;
   const name = form.name;
   const image = form.image;

   if (!email || !name) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = `Email and Name is required but got email - ${email} name - ${name}`;
      return error;
   }

   if (isValidEmail(email) === false) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = `Provided email - ${email} is invalid`;
      return error;
   }

   if (image && isValidUrl(image) === false) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.message = `Given image - ${image} is not a valid url`;
      return error;
   }

   const res = await axios.post(`${BASE_URL}/user/oauth/register`, { email, image, name });
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) return httpRes;

   success.message = httpRes.message;
   success.data = httpRes.data;
   success.status = httpRes.status;
   return success;
}
