import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middleware/error-handler";
import { handleRouteError } from "./utils/handle-route-error";

import userRoutes from "./routes/userRoutes";
import socialRoutes from "./routes/socialRoutes";
import statusRoutes from "./routes/statusRoutes";

export const app = express();

// Middlewares
app.use(bodyParser.json());
app.use("/social", socialRoutes);
app.use("/user", userRoutes);
app.use("/", statusRoutes);
app.all("*", handleRouteError);

app.use(globalErrorHandler);

export const handler = serverless(app);
