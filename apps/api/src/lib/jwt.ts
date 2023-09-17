import jwt from "jsonwebtoken";

export async function generateJwtToken(user: User) {
   try {
      return jwt.sign(user, "MY_SECRET", { expiresIn: "30d" });
   } catch (error) {
      throw new Error("Unable to generate jwt token");
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
