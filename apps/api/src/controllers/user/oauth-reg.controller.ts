import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidEmail, isValidUrl } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { signJwtToken } from "../../lib/jwt";

/**
 * OAuth Registration Controller Middleware
 *
 * This middleware handles user registration and login through OAuth. It validates and processes
 * user information such as email, name, age, and image. It checks if the user already exists
 * and either logs in or signs up accordingly. It also generates and responds with a JWT token
 * upon successful registration or login. Various validation checks and error handling are in place.
 *
 * @param {Request} req - The Express request object containing user registration data in the request body.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function oauthRegisterController(req: Request, res: Response, next: NextFunction) {
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

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
         // Log in
         const newToken = signJwtToken({
            id: existingUser.id,
            email,
         })(req, res, next);

         success.status = HTTP_STATUS.CREATED;
         success.message = `User with email - ${email} found`;
         success.data = { token: newToken, user: existingUser };
         res.status(success.status).json(success);
      } else {
         // Sign up
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
      }
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
