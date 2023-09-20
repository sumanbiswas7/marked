import { Router } from "express";

import { deleteController } from "../controllers/category/delete.controller";
import { createLink } from "../controllers/link/create.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: link/
 * -------------------------------
 */

route.post("/create", createLink);
route.delete("/:id", deleteController);

export default route;
