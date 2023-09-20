import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateCreateCatagory } from "../../utils/validators/category-validate";

export async function createController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});

      const userId = getIdFromAccessToken()(req, res, next);

      const modifiedCategory = validateCreateCatagory(req.body)(req, res, next);
      if (!modifiedCategory.isImportant) modifiedCategory.isImportant = false;
      if (!modifiedCategory.color) modifiedCategory.color = pickRandmonColor();

      const created = await prisma.category.create({ data: { userId: userId!, ...modifiedCategory } });

      success.status = HTTP_STATUS.OK;
      success.message = `Category - ${created.id} created successfully`;
      success.data = { created };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}

/**
 * ----------------
 *     Utils
 * ----------------
 */
function pickRandmonColor() {
   const COLORS = ["#FFCEAA", "#A7F294", "#AAD6FF", "#FFAAAA"];

   const randomIndex = Math.floor(Math.random() * COLORS.length);
   return COLORS[randomIndex];
}
