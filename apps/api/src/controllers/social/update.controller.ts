import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { validateUpdateSocials } from "../../utils/validators/social-user-validate";

/**
 * Update Social Links Controller Middleware
 *
 * This middleware extracts the user's ID from an access_token, receives a SocialMediaKeys object
 * in the request body, and updates the user's social media links based on the provided keys.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function updateController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});

      const links = req.body;
      const userId = getIdFromAccessToken()(req, res, next);
      const validLinks = validateUpdateSocials(links)(req, res, next);

      let updated;
      let msg;

      const curSocial = await prisma.social.findUnique({ where: { userId: userId! } });

      if (curSocial !== null) {
         const updatedRes = await prisma.social.update({ where: { userId: userId! }, data: { ...validLinks } });
         updated = { updated: true, res: updatedRes };
         msg = `Social handlers updated successfully`;
      } else {
         const createdRes = await prisma.social.create({ data: { userId: userId!, ...validLinks } });
         updated = { created: true, res: createdRes };
         msg = `Social handlers created successfully`;
      }

      success.status = HTTP_STATUS.OK;
      success.message = msg;
      success.data = { updated };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
