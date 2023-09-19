import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/response";
import { HTTP_STATUS } from "@marked/utils";

export function handleError(err: Error | unknown, status?: number | null, message?: string) {
   return (req: Request, res: Response, next: NextFunction) => {
      let error;
      console.error("Error: handleError()", err);

      if (err instanceof HttpResponse) {
         error = err;
      } else if (err instanceof Error) {
         error = new HttpResponse({
            status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
            isError: true,
            data: err.name,
            message: message || err.message || "Internal server error",
         });
      } else {
         error = new HttpResponse({
            status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
            isError: true,
            data: null,
            message: message || "Internal server error",
         });
      }

      next(error);
   };
}
