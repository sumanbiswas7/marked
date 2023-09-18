import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { verifyJwtToken } from "../../lib/jwt";

/**
 * Extracts email from access_token and returns the user
 */
export async function meController(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
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
      const userId = (decoded as any).id;

      if (!userId) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `No Id found in decoded token - ${decoded}`;
         error.data = { userId };
         return handleError(error)(req, res, next);
      }

      const userById = await prisma.user.findUnique({
         where: { id: userId },
         include: { categories: true, notifications: true, social: true },
      });

      if (!userById) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `No user found with id - ${userById}`;
         error.data = { user: userById };
         return handleError(error)(req, res, next);
      }

      success.status = HTTP_STATUS.OK;
      success.data = { user: userById };
      success.message = `User found with id - ${userId}`;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
