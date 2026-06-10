import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoute from "./router/index.js";
import { env } from "./utils/env.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", indexRoute);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env("PORT", "3000"));

  app.listen(PORT, () => {
    console.log(`The server is running on ${PORT} port`);
  });
};
