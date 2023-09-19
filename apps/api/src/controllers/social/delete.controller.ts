import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import { getIdFromAccessToken } from "../../utils/get-id-from-token";
import { socialMediaKeys } from "../../data/social-media-keys";

/**
 * Extracts userId from access_token and finds the social media and deletes the key
 */
export async function deleteController(req: Request, res: Response, next: NextFunction) {
   try {
      const prisma = new PrismaClient();
      const success = new HttpResponse({});
      const error = new HttpResponse({ isError: true });

      const key = req.params.key;

      if (!socialMediaKeys.includes(key)) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Provided social media - ${key} is not valid`;
         error.data = { provided: key };
         return handleError(error)(req, res, next);
      }

      const userId = getIdFromAccessToken()(req, res, next);
      const updated = await prisma.social.update({
         where: { userId: userId! },
         data: {
            [key]: null,
         },
      });

      success.status = HTTP_STATUS.OK;
      success.message = `Social media - ${key} deleted`;
      success.data = { updated };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
