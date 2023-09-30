import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateUpdateSocials } from "../../utils/validators/social-user-validate";

/**
 * Add new OtherSocialLink Controller Middleware
 *
 * This middleware extracts the user's ID from an access_token, receives a link, title, socialId from request
 * body validates link and title and checks if the user with access_token has permission to add a link and adds.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function addOtherLinkController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const error = new HttpResponse({ isError: true });
      const success = new HttpResponse({});

      const data = req.body;

      if (!data.socialId) {
         error.message = `No socialId provided`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      const userId = getIdFromAccessToken()(req, res, next);
      const userById = await prisma.user.findUnique({ where: { id: userId! }, include: { social: true } });

      if (!userById?.social?.id) {
         error.message = `User must have a Social Table first`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      if (data.socialId !== userById?.social?.id) {
         error.message = `User don't have permission to add link`;
         error.status = HTTP_STATUS.FORBIDDEN;
         res.status(error.status).json(error);
      }

      if (!data.title) {
         error.message = `No title provided`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      if (!data.link) {
         error.message = `No link provided`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      if (isValidUrl(data.link) === false) {
         error.message = `Given link is not valid`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      const newLink = await prisma.otherSocialLink.create({
         data: { link: data.link, name: data.title, socialId: data.socialId },
      });

      success.status = HTTP_STATUS.OK;
      success.data = { newLink };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
