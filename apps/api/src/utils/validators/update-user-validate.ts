import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../models/response";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { handleError } from "../error-handler";

/**
 * Returns a modified user with only correct keys or handles error
 *
 * @param user {req.body}
 * @returns modified user with correct keys
 */
export function validateUpdateUser(user: any) {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });

      if (!user.name && !user.age && !user.image) {
         error.message = `Any key 'name' or 'age' or 'image' is required but got none`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.data = { user };
         return handleError(error)(req, res, next);
      }

      if (user.age && typeof user.age !== "number") {
         error.message = `Key 'age' should be a number`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.data = { user };
         return handleError(error)(req, res, next);
      }

      if (user.image && isValidUrl(user.image) === false) {
         error.message = `Provided 'image' is not a url`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.data = { user };
         return handleError(error)(req, res, next);
      }

      const modifiedUser: ModifiedUser = {};
      if (user.name) modifiedUser["name"] = user.name;
      if (user.age) modifiedUser["age"] = user.age;
      if (user.image) modifiedUser["image"] = user.image;

      return modifiedUser;
   };
}

interface ModifiedUser {
   name?: string;
   age?: number;
   image?: string;
}
