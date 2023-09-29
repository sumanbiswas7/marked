import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";

/**
 * All Users Controller Middleware
 *
 * This middleware retrieves all users from the database, including their associated categories.
 * It sets an HTTP OK status code and responds with a list of all users. Any errors during this
 * process are gracefully handled.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function allController(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();
   const success = new HttpResponse({});

   try {
      const allUsers = await prisma.user.findMany({ include: { categories: true } });
      success.status = HTTP_STATUS.OK;
      success.message = `All users`;
      const userArr = Object.values(allUsers);
      success.data = userArr;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}

// REVIEW: Delete for dev only
export async function deleteAllExceptController(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();
   try {
      await prisma.social.deleteMany();
      await prisma.link.deleteMany();
      await prisma.category.deleteMany();
      const resp = await prisma.user.deleteMany();
      res.json(resp);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
