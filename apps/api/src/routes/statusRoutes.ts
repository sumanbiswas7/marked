import { Router, Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@marked/utils";
import { handleError } from "../utils/error-handler";
const route = Router();

route.get(
   "/status",
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         res.status(HTTP_STATUS.OK).json({
            working: true,
            message: "Hello from marked backend 💻",
         });
      } catch (error) {
         handleError(error)(req, res, next);
      }
   }
);

export default route;
