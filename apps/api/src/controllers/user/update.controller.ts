import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { verifyJwtToken } from "../../lib/jwt";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

/**
 * Extracts email from access_token and updates the user
 */
export async function updateController(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });
      const userId = getIdFromAccessToken()(req, res, next);
      // TODO: Implement

      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
