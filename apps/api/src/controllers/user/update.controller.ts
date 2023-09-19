import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateUpdateUser } from "../../utils/validators/update-user-validate";

/**
 * Extracts email from access_token and updates the user
 */
export async function updateController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});

      const user = req.body;
      const userId = getIdFromAccessToken()(req, res, next);
      const modifiedUser = validateUpdateUser(user)(req, res, next);

      const updatedRes = await prisma.user.update({
         where: { id: userId! },
         data: {
            ...modifiedUser,
         },
      });

      success.status = HTTP_STATUS.OK;
      success.data = { updated: updatedRes };
      success.message = `User - ${userId} updated successfuly`;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
