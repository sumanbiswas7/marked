import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";

export async function statusController(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const success = new HttpResponse({});

   try {
      success.status = HTTP_STATUS.OK;
      success.message = "Hello from marked backend 💻";
      success.data = { working: true };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
