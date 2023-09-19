import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../models/response";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { handleError } from "../error-handler";

/**
 * Returns a modified user with only correct keys or handles error
 *
 * @param links {req.body}
 * @returns modified links with correct keys
 */
export function validateUpdateSocials(linksObj: any) {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });
      const validLinks: any = {};

      for (const key in linksObj) {
         // add valid key, url pairs
         if (isValidKey(key) && isValidUrl(linksObj[key])) {
            validLinks[key] = linksObj[key];
         }
      }

      if (Object.keys(validLinks).length === 0) {
         // No key is valid and no url is valid
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `No valid social media key and url value pair found`;
         error.data = { given: linksObj, allowed: socialMediaKeys };
         return handleError(error)(req, res, next);
      } else {
         return validLinks;
      }
   };
}

/**
 * ------------------
 *      Utils
 * ------------------
 */
const socialMediaKeys = [
   "instagram",
   "github",
   "facebook",
   "tiktok",
   "twitter",
   "snapchat",
   "leetcode",
   "youtube",
   "other",
   "portfolio",
   "linkedin",
];

function isValidKey(key: string) {
   return socialMediaKeys.includes(key);
}

/**
 * -------------------
 *      Types
 * -------------------
 */
interface Social {
   instagram?: String;
   github?: String;
   facebook?: String;
   tiktok?: String;
   twitter?: String;
   snapchat?: String;
   leetcode?: String;
   youtube?: String;
   other?: String;
   portfolio?: String;
   linkedin?: String;
}