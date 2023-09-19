import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidEmail, isValidUrl } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { signJwtToken } from "../../lib/jwt";

export async function signupController(req: Request, res: Response, next: NextFunction) {
   const prisma = new PrismaClient();

   try {
      const { email, name, age, image } = req.body;
      const error = new HttpResponse({ isError: true });
      const success = new HttpResponse({});

      if (!email || !name) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Email and Name is required but got email - ${email} name - ${name}`;
         return handleError(error)(req, res, next);
      }

      if (isValidEmail(email) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Provided email - ${email} is invalid`;
         return handleError(error)(req, res, next);
      }

      if (image && isValidUrl(image) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given image - ${image} is not a valid url`;
         return handleError(error)(req, res, next);
      }

      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `User with email - ${email} already exists`;
         return handleError(error)(req, res, next);
      }

      const newUser = await prisma.user.create({
         data: { email, name, views: 0, image, age },
      });

      if (!newUser) {
         error.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
         error.message = `Unable to create an user`;
         return handleError(error)(req, res, next);
      }

      const newToken = signJwtToken({
         id: newUser.id,
         email: newUser.email,
      })(req, res, next);

      success.status = HTTP_STATUS.CREATED;
      success.message = `User with email - ${email} created successfully`;
      success.data = { token: newToken, user: newUser };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
