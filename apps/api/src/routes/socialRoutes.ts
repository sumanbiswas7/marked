import { Router } from "express";

import { updateController } from "../controllers/social/update.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: social/
 * -------------------------------
 */

route.post("/update", updateController);

export default route;
