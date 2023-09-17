import serverless from "serverless-http";
import express from "express";
import userRoute from "./routes/userRoute";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middleware/error-handler";
import { handleRouteError } from "./utils/handle-route-error";

export const app = express();

// Middlewares
app.use("/user", userRoute);
app.all("*", handleRouteError);

app.use(bodyParser.json());
app.use(globalErrorHandler);

export const handler = serverless(app);
