import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";

/**
 * Status Controller Middleware
 *
 * This middleware responds with a status message indicating that the backend is operational.
 * It sets an HTTP OK status code and a greeting message. Any errors are gracefully handled.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function statusController(req: Request, res: Response, next: NextFunction) {
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
