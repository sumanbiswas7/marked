import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidEmail } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";

export async function allController(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();
   const success = new HttpResponse({});

   try {
      const allUsers = await prisma.user.findMany();
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
      const resp = await prisma.user.deleteMany();
      res.json(resp);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
