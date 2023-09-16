import serverless from "serverless-http";
import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute";
import { sayMyName, hello } from "@marked/utils";

export const app = express();

app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
   res.json({
      working: true,
      message: `Hello World`,
      hello: hello(),
      name: sayMyName("Walter White"),
      secret: `SECRET: ${process.env.SECRET}`,
   });
});

export const handler = serverless(app);
