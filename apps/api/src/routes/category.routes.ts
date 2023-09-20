import { Router } from "express";

import { updateController } from "../controllers/category/update.controller";
import { deleteController } from "../controllers/category/delete.controller";
import { createController } from "../controllers/category/create.controller";
import { getAllCategory } from "../controllers/category/all.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: category/
 * -------------------------------
 */

route.get("/me/all", getAllCategory);
route.post("/update/:id", updateController);
route.post("/create", createController);
route.delete("/:key", deleteController);

export default route;
