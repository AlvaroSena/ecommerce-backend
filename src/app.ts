import express from "express";
import { routes } from "./routes";
import { restExceptionHandler } from "./middlewares/restExceptionHandler";

export const app = express();
app.use(express.json());
app.use("/api/v1", routes);
app.use(restExceptionHandler);
