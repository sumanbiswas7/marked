import { Router } from "express";

import { createLink } from "../controllers/link/create.controller";
import { deleteLink } from "../controllers/link/delete.controller";

const route = Router();

/**
 * -------------------------------
 *    Routes: link/
 * -------------------------------
 */

route.post("/create", createLink);
route.delete("/:id", deleteLink);

export default route;
