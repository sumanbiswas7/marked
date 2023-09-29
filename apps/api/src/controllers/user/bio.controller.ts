import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidEmail } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";

/**
 * User Bio Controller Middleware
 *
 * This middleware retrieves user information based on their email, increments the view count
 * for that user's profile, and responds with the user's details. It also handles various validation
 * checks and error scenarios gracefully.
 *
 * @param {Request} req - The Express request object containing the user's email as a parameter.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function bioController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const error = new HttpResponse({ isError: true });
      const success = new HttpResponse({});
      const email = req.params.email;

      if (isValidEmail(email) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Invalid email provided - ${email}`;
         return handleError(error)(req, res, next);
      }

      const user = await prisma.user.findUnique({
         where: { email: email },
         include: {
            social: {
               include: { other: true },
            },
         },
      });

      if (!user) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `Any User with email - ${email} not found`;
         return handleError(error)(req, res, next);
      }

      await prisma.user.update({
         where: { id: user.id },
         data: {
            views: user.views + 1,
         },
      });

      success.data = { user };
      success.status = HTTP_STATUS.OK;
      success.message = `User with email - ${email} found`;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
