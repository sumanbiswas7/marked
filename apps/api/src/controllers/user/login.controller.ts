import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidEmail } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { signJwtToken } from "../../lib/jwt";

export async function loginController(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();

   try {
      const { email, id } = req.body;
      const error = new HttpResponse({ isError: true });
      const success = new HttpResponse({});

      if (!email || !id) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `User Email and ID is required but got email:${email}, id:${id}`;
         return handleError(error)(req, res, next);
      }

      if (isValidEmail(email) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Invalid email provided - ${email}`;
         return handleError(error)(req, res, next);
      }

      const isUserExist = await prisma.user.findUnique({
         where: { email, id },
      });

      if (!isUserExist) {
         error.status = HTTP_STATUS.NOT_FOUND;
         error.message = `User with email:${email} and id:${id} doesn't exist`;
         return handleError(error)(req, res, next);
      }

      const token = signJwtToken({ email, id })(req, res, next);

      if (!token) {
         error.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
         error.message = "No token generated";
         return handleError(error)(req, res, next);
      }

      success.status = HTTP_STATUS.OK;
      success.message = `Login with user - ${email} successfull`;
      success.data = { token };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
