import { Router } from "express";

import { updateController } from "../controllers/category/update.controller";
import { deleteController } from "../controllers/category/delete.controller";
import { createController } from "../controllers/category/create.controller";
import { getAllCategoriesDev, getAllCategory } from "../controllers/category/all.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: category/
 * -------------------------------
 */

route.get("/me/all", getAllCategory);
route.get("/all", getAllCategoriesDev);

route.post("/update/:id", updateController);
route.post("/create", createController);
route.delete("/:id", deleteController);

export default route;
