import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateUpdateUser } from "../../utils/validators/update-user-validate";

/**
 * User Update Controller Middleware
 *
 * This middleware extracts the user's ID from an access_token, validates and updates the user's
 * information based on the provided data. It responds with a success message upon successful update.
 * Various validation checks and error handling are in place to ensure a smooth update process.
 *
 * @param {Request} req - The Express request object containing user update data in the request body.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
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
