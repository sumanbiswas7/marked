import jwt from "jsonwebtoken";
import { handleError } from "../utils/error-handler";
import { HTTP_STATUS } from "@marked/utils";
import { NextFunction, Request, Response } from "express";

export async function generateJwtToken(
   user: User,
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const token = jwt.sign(user, "MY_SECRET", { expiresIn: "30d" });
      console.log("generateJwtToken()", token);

      if (!token) {
         handleError(null, null, "No generated token found")(req, res, next);
      }

      return token;
   } catch (error) {
      handleError(error, null, "Unable to sign jwt token")(req, res, next);
   }
}

/**
 * ----------------
 *      Types
 * ----------------
 */
interface User {
   id: string;
   email: string;
}
