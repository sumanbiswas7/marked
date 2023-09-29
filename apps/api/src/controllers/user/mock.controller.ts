import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { HttpResponse } from "../../models/response";
import { handleError } from "../../utils/error-handler";
import DUMMY_USER from "../../data/mock-user";

// REVIEW: DELETE ME
export async function mockUserController(req: Request, res: Response, next: NextFunction) {
   try {
      const success = new HttpResponse({});
      await new Promise((resolve) => setTimeout(resolve, 2000));

      success.status = HTTP_STATUS.OK;
      success.message = "Sample user, This data is not from db";
      success.data = { ...DUMMY_USER };
      res.status(success.status).json(success);
   } catch (error) {
      handleError(error)(req, res, next);
   }
}
