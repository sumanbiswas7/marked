/**
 * ------------------
 *     Validation
 * ------------------
 */

import { isValidUrl } from "@marked/utils";

export function validateLink(form: Form, type: "update" | "create"): string | null {
   const MAX_TITLE_LENGTH = 15;
   const MAX_DESC_LENGTH = 45;

   if (type === "create") {
      if (!form.title) return `Title is required`;
      if (!form.link) return `Link is required`;

      if (form.title.length > MAX_DESC_LENGTH) return `Title is too big max length - ${MAX_TITLE_LENGTH}`;
      if (isValidUrl(form.link) === false) return `Given link is not a valid url`;
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
   link?: string;
}
