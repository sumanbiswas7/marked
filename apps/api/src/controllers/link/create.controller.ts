import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

export async function createLink(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const userId = getIdFromAccessToken()(req, res, next);
      const { categoryId, link, title } = req.body;

      if (!categoryId || (categoryId && typeof categoryId !== "string")) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `No valid categoryId provided`;
         error.data = { categoryId };
         return handleError(error)(req, res, next);
      }

      const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Any category with given id doesn't exists`;
         error.data = { categoryId, categoryExists };
         return handleError(error)(req, res, next);
      }

      if (categoryExists.userId !== userId) {
         error.status = HTTP_STATUS.FORBIDDEN;
         error.message = `User doen't have permission to create link in this category`;
         return handleError(error)(req, res, next);
      }

      if (!link || (link && isValidUrl(link) === false)) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `No valid link provided`;
         error.data = { link };
         return handleError(error)(req, res, next);
      }

      const newLink = await prisma.link.create({ data: { categoryId, link, title } });

      success.status = HTTP_STATUS.CREATED;
      success.message = `New link added successfully`;
      success.data = { newLink };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
