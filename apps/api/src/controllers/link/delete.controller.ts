import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

export async function deleteLink(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const userId = getIdFromAccessToken()(req, res, next);
      const userCategories = await prisma.category.findMany({ where: { userId: userId! } });
      const deleteId = req.params.id;
      const { categoryId } = req.body;

      if (!categoryId) {
         error.message = `No category id provided`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.data = { msg: "Category id assosiated with link is required" };
         return handleError(error)(req, res, next);
      }

      if (userCategories.length === 0) {
         error.message = `User don't have any categories`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         return handleError(error)(req, res, next);
      }

      // check: user from access_token owns the category assosiated with link
      const delIdExistsinCat = userCategories.some((c) => c.id === categoryId);
      if (!delIdExistsinCat) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `User don't have permission to delete the category`;
         error.data = { delIdExistsinCat };
         return handleError(error)(req, res, next);
      }

      const deleted = await prisma.link.delete({ where: { id: deleteId } });

      success.status = HTTP_STATUS.CREATED;
      success.message = `New link added successfully`;
      success.data = { deleted };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
