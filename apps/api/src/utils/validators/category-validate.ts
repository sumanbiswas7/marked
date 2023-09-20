import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../models/response";
import { HTTP_STATUS, isValidUrl } from "@marked/utils";
import { handleError } from "../error-handler";
import { isValidHexcolor } from "@marked/utils";

export function validateUpdateCatagory(body: any) {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });
      const modifiedCategory: any = {};

      if (body.color && isValidHexcolor(body.color) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given color is not a valid hex color`;
         error.data = { body: req.body.color };
         return handleError(error)(req, res, next);
      }

      if (body.image && isValidUrl(body.image) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given image is not a valid url`;
         error.data = { body: body.image };
         return handleError(error)(req, res, next);
      }

      const MAX_TITLE_LENGTH = 25;
      if (body.title && body.title.length > MAX_TITLE_LENGTH) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given title length is more than ${MAX_TITLE_LENGTH}`;
         error.data = { title: body.title };
         return handleError(error)(req, res, next);
      }

      const MAX_DESC_LENGTH = 45;
      if (body.description && body.description.length > MAX_DESC_LENGTH) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given description length is more than ${MAX_DESC_LENGTH}`;
         error.data = { description: body.description };
         return handleError(error)(req, res, next);
      }

      if (body.color) modifiedCategory["color"] = body.color;
      if (body.title) modifiedCategory["title"] = body.title;
      if (body.image) modifiedCategory["image"] = body.image;
      if (body.description) modifiedCategory["description"] = body.description;
      if (body.isImportant) modifiedCategory["isImportant"] = body.isImportant;
      return modifiedCategory;
   };
}

export function validateCreateCatagory(body: any) {
   return (req: Request, res: Response, next: NextFunction) => {
      const error = new HttpResponse({ isError: true });
      const modifiedCategory: any = {};

      if (body.color && isValidHexcolor(body.color) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given color is not a valid hex color`;
         error.data = { body: req.body.color };
         return handleError(error)(req, res, next);
      }

      if (body.image && isValidUrl(body.image) === false) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given image is not a valid url`;
         error.data = { body: body.image };
         return handleError(error)(req, res, next);
      }

      if (!body.title) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Title is required`;
         error.data = { body };
         return handleError(error)(req, res, next);
      }

      const MAX_TITLE_LENGTH = 25;
      if (body.title.length > MAX_TITLE_LENGTH) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given title length is more than ${MAX_TITLE_LENGTH}`;
         error.data = { title: body.title };
         return handleError(error)(req, res, next);
      }

      if (!body.description) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Description is required`;
         error.data = { body };
         return handleError(error)(req, res, next);
      }

      const MAX_DESC_LENGTH = 45;
      if (body.description && body.description.length > MAX_DESC_LENGTH) {
         error.status = HTTP_STATUS.BAD_REQUEST;
         error.message = `Given description length is more than ${MAX_DESC_LENGTH}`;
         error.data = { description: body.description };
         return handleError(error)(req, res, next);
      }

      if (body.color) modifiedCategory["color"] = body.color;
      if (body.title) modifiedCategory["title"] = body.title;
      if (body.image) modifiedCategory["image"] = body.image;
      if (body.description) modifiedCategory["description"] = body.description;
      if (body.isImportant) modifiedCategory["isImportant"] = body.isImportant;
      return modifiedCategory;
   };
}
