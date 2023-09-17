import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/response";

export function globalErrorHandler(
   err: HttpResponse,
   req: Request,
   res: Response,
   next: NextFunction
) {
   res.status(err.status).send(err);
}
