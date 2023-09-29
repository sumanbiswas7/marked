import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateUpdateCatagory } from "../../utils/validators/category-validate";

/**
 * Update Category Middleware
 *
 * This middleware extracts the user's ID from an access_token, and receives a Category id in
 * request params and Category object in req.body and updates the keys present in req.body.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
export async function updateController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const userId = getIdFromAccessToken()(req, res, next);
      const categoryId = req.params.id;
      const category = await prisma.category.findUnique({ where: { id: categoryId } });

      if (!category) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `Category with id - ${categoryId} not found`;
         return handleError(error)(req, res, next);
      }

      if (category.userId !== userId) {
         error.status = HTTP_STATUS.FORBIDDEN;
         error.message = `User don't have access to change the category`;
         error.data = { categoryId, userId };
         return handleError(error)(req, res, next);
      }

      const modifiedCategory = validateUpdateCatagory(req.body)(req, res, next);
      const updated = await prisma.category.update({ where: { id: categoryId }, data: { ...modifiedCategory } });

      success.status = HTTP_STATUS.OK;
      success.message = `Category - ${categoryId} updated successfully`;
      success.data = { updated };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
