import { Router } from "express";

import { updateController } from "../controllers/social/update.controller";
import { deleteController } from "../controllers/social/delete.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: social/
 * -------------------------------
 */

route.post("/update", updateController);
route.delete("/:key", deleteController);

export default route;
