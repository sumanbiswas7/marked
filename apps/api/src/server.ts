import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middleware/error-handler";
import { handleRouteError } from "./utils/handle-route-error";

import userRoutes from "./routes/user.routes";
import socialRoutes from "./routes/social.routes";
import statusRoutes from "./routes/status.routes";
import categoryRoutes from "./routes/category.routes";

export const app = express();

// Middlewares
app.use(bodyParser.json());

app.use("/category", categoryRoutes);
app.use("/social", socialRoutes);
app.use("/user", userRoutes);
app.use("/", statusRoutes);
app.all("*", handleRouteError);

app.use(globalErrorHandler);

export const handler = serverless(app);
