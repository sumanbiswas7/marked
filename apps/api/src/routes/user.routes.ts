import { Router } from "express";

import { loginController } from "../controllers/user/login.controller";
import { bioController } from "../controllers/user/bio.controller";
import { mockUserController } from "../controllers/user/mock.controller";
import { signupController } from "../controllers/user/signup.controller";
import { allController } from "../controllers/user/all.controller";
import { deleteAllExceptController } from "../controllers/user/all.controller";
import { meController } from "../controllers/user/me.controller";
import { updateController } from "../controllers/user/update.controller";
import { oauthRegisterController } from "../controllers/user/oauth-reg.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: user/
 * -------------------------------
 */
route.get("/mock", mockUserController);
route.get("/me", meController);
route.get("/bio/:email", bioController);
route.get("/all", allController);

route.post("/update/me", updateController);
route.post("/login", loginController);
route.post("/signup", signupController);
route.post("/oauth/register", oauthRegisterController);

// REVIEW: for Dev delete later
route.delete("/delete_all", deleteAllExceptController);

export default route;
