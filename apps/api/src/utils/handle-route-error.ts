import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/response";
import { HTTP_STATUS } from "@marked/utils";

export function handleRouteError(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const error = new HttpResponse({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      isError: true,
      message: `Endpoint ${req.originalUrl} doesn't exist on the server`,
   });

   next(error);
}
