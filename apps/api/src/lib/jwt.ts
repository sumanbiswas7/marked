import jwt from "jsonwebtoken";
import { handleError } from "../utils/error-handler";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/response";
import { HTTP_STATUS } from "@marked/utils";

export function signJwtToken(user: User) {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });
      try {
         const token = jwt.sign(user, "SECRET", { expiresIn: "30d" });

         if (!token || token.length < 5) {
            error.message = "signJwtToken(): Unable to generate jwt token";
            error.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            error.data = { token };
            return handleError(error)(req, res, next);
         }

         return token;
      } catch (err) {
         handleError(err)(req, res, next);
      }
   };
}

/**
 * ----------------
 *      Types
 * ----------------
 */
interface User {
   id: string;
   email: string;
}
