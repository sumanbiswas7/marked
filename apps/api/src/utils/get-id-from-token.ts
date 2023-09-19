import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/response";
import { HTTP_STATUS } from "@marked/utils";
import { handleError } from "./error-handler";
import { verifyJwtToken } from "../lib/jwt";

/**
 * Extracts the access_token from `req.headers.access_token` and
 * returns the id from the jwt token if exists, handles all error
 * If got no Id sends response
 */
export function getIdFromAccessToken() {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });

      const headers = req.headers as any;
      const token = headers["access_token"];

      if (!token) {
         error.message = `No access_token token found`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.data = { token };
         return handleError(error)(req, res, next);
      }

      const decoded = verifyJwtToken(token)(req, res, next);
      const userId: string = (decoded as any).id;

      if (!userId || typeof userId !== "string") {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `No Id found in decoded token - ${decoded}`;
         error.data = { userId };
         return handleError(error)(req, res, next);
      }

      return userId;
   };
}
