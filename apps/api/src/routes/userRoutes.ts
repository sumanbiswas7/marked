import { Router } from "express";

import { loginController } from "../controllers/user/login.controller";
import { bioController } from "../controllers/user/bio.controller";
import { mockUserController } from "../controllers/user/mock.controller";

const route = Router();

// Routes
route.get("/mock", mockUserController);
route.post("/login", loginController);
route.get("/bio/:email", bioController);

export default route;
