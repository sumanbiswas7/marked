import { Router } from "express";

import { loginController } from "../controllers/user/login.controller";
import { bioController } from "../controllers/user/bio.controller";
import { mockUserController } from "../controllers/user/mock.controller";
import { signupController } from "../controllers/user/signup.controller";
import { allController } from "../controllers/user/all.controller";
import { deleteAllExceptController } from "../controllers/user/all.controller";
import { meController } from "../controllers/user/me.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: user/
 * -------------------------------
 */
route.get("/mock", mockUserController);
route.get("/me", meController);
route.get("/all", allController);
route.delete("/delete_all", deleteAllExceptController);
route.post("/login", loginController);
route.post("/signup", signupController);
route.get("/bio/:email", bioController);

export default route;
