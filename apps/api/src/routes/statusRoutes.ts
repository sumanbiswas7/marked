import { Router } from "express";
import { statusController } from "../controllers/status/status.controller";

const route = Router();

// Routes
route.get("/status", statusController);

export default route;
