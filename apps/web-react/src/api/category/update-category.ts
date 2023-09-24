import axios from "axios";
import { HttpResponse, isValidHexcolor, isValidUrl } from "@marked/utils";
import { BASE_URL } from "../../constants/base-url";
import { getAccessToken } from "../../utils/get-token";

export async function updateCategory(categoryId: string, form: Form): Promise<HttpResponse> {
   const success = new HttpResponse({});
   const error = new HttpResponse({ isError: true });
   const token = getAccessToken();

   const res = await axios.post(`${BASE_URL}/category/update/${categoryId}`, form, {
      headers: { access_token: token.token },
   });
   const httpRes = res.data as HttpResponse;

   if (httpRes.isError) {
      error.status = httpRes.status;
      error.message = httpRes.message;
      error.data = httpRes.data;
      throw new HttpResponse(error);
   }

   success.status = httpRes.status;
   success.message = httpRes.message;
   success.data = httpRes.data;
   return success;
}

/**
 * ------------------
 *     Validation
 * ------------------
 */

export function validateCategory(form: Form, type: "update" | "create"): string | null {
   const MAX_DESC_LENGTH = 45;
   const MAX_TITLE_LENGTH = 25;

   if (type === "create") {
      if (!form.title) return `Title is required`;
      if (!form.description) return `Description is required`;
      if (form.title.length > MAX_TITLE_LENGTH) return `Title seems too big max length - ${MAX_TITLE_LENGTH}`;
      if (form.description.length > MAX_DESC_LENGTH) return `Description seems too big max length - ${MAX_DESC_LENGTH}`;
      if (form.color && isValidHexcolor(form.color) === false)
         return `Given color - ${form.color} is not a valid color`;
      if (form.image && isValidUrl(form.image)) return `Provided image is not a valid url`;
      if (form.isImportant && typeof form.isImportant !== "boolean")
         return `Invalid important label provided - ${form.isImportant}`;
   }

   if (type === "update") {
      if (form.title && form.title.length > MAX_TITLE_LENGTH)
         return `Title seems too big max length - ${MAX_TITLE_LENGTH}`;
      if (form.description && form.description.length > MAX_DESC_LENGTH)
         return `Description seems too big max length - ${MAX_DESC_LENGTH}`;
      if (form.color && isValidHexcolor(form.color) === false)
         return `Given color - ${form.color} is not a valid color`;
      if (form.image && isValidUrl(form.image)) return `Provided image is not a valid url`;
      if (form.isImportant && typeof form.isImportant !== "boolean")
         return `Invalid important label provided - ${form.isImportant}`;
   }

   return null;
}

/**
 * ----------------
 *     Types
 * ----------------
 */

interface Form {
   title?: string;
   description?: string;
   isImportant?: boolean;
   image?: string;
   color?: string;
}
