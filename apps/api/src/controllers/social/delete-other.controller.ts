import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { socialMediaKeys } from "../../data/social-media-keys";

/**
 * Delete Other Social Link Controller Middleware
 *
 * This middleware extracts the user's ID from an access_token, receives a id key in the
 * request param, checks if the link id belongs to the user and proceeds with deletion.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */

export async function deleteOtherLinkController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const key = req.params.key;

      const userId = getIdFromAccessToken()(req, res, next);
      const userById = await prisma.user.findUnique({
         where: { id: userId! },
         include: { social: { include: { other: true } } },
      });

      let isPermitted = false;
      const otherLinksArr = userById?.social?.other || [];
      for (const link of otherLinksArr) {
         if (link.id === key) isPermitted = true;
      }

      if (isPermitted === false) {
         error.message = `Not allowed to delete this link`;
         error.status = HTTP_STATUS.BAD_REQUEST;
         res.status(error.status).json(error);
      }

      const deleted = await prisma.otherSocialLink.delete({ where: { id: key } });

      success.status = HTTP_STATUS.OK;
      success.data = { deleted };
      success.message = `Other Social media - ${key} deleted`;
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
