import { Router } from "express";

import { updateController } from "../controllers/social/update.controller";
import { deleteController } from "../controllers/social/delete.controller";
import { addOtherLinkController } from "../controllers/social/add-other.controller";
import { deleteOtherLinkController } from "../controllers/social/delete-other.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: social/
 * -------------------------------
 */

route.post("/update", updateController);
route.post("/add/other-link", addOtherLinkController);
route.delete("/other-link/:key", deleteOtherLinkController);
route.delete("/:key", deleteController);

export default route;
