import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

/**
 * Get Links by Category ID Middleware
 *
 * This middleware retrieves all links associated with a specific category ID. It queries
 * the database for links matching given category id, and responds with the retrieved links.
 * Any errors during this process are handled gracefully.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function getLinksByCategoryId(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});

      const categoryId = req.params.categoryId;
      const __ = getIdFromAccessToken();

      const links = await prisma.link.findMany({ where: { categoryId }, include: { category: true } });

      success.status = HTTP_STATUS.OK;
      success.message = `All links from by category - ${categoryId}`;
      success.data = { links };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
