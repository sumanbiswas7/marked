import { Router } from "express";

import { createLink } from "../controllers/link/create.controller";
import { deleteLink } from "../controllers/link/delete.controller";
import { getLinksByCategoryId } from "../controllers/link/get.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: link/
 * -------------------------------
 */

route.post("/create", createLink);
route.delete("/:id", deleteLink);
route.get("/all/:categoryId", getLinksByCategoryId);

export default route;
