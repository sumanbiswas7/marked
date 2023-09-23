import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";

export async function getAllCategory(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});

      const userId = getIdFromAccessToken()(req, res, next);
      const categories = await prisma.category.findMany({ where: { userId: userId! } });

      success.status = HTTP_STATUS.OK;
      success.message = `All categories by - ${userId}`;
      success.data = { categories };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}

// REVIEW: Delete later for dev
export async function getAllCategoriesDev(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();
   const resp = await prisma.category.findMany();
   res.json(resp);
}
