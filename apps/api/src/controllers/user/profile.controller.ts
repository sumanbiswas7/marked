import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

/**
 * User Profile Controller Middleware
 *
 * This middleware extracts the user's ID from an access_token, retrieves user information,
 * social media links, and responds with the user's details.
 * It performs validation checks, token verification, and error handling gracefully.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function profileController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const userId = getIdFromAccessToken()(req, res, next);

      const userById = await prisma.user.findUnique({
         where: { id: userId! },
         include: { social: { include: { other: true } } },
      });

      if (!userById) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `No profile found with id - ${userById}`;
         error.data = { user: userById };
         return handleError(error)(req, res, next);
      }

      success.status = HTTP_STATUS.OK;
      success.data = { user: userById };
      success.message = `User profile found with id - ${userId}`;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
