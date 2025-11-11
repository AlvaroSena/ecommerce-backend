import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { restExceptionHandler } from "./middlewares/restExceptionHandler";

export const app: Application = express();
app.use(
  cors({
    origin: process.env.WEB_ORIGIN!,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);
app.use(restExceptionHandler);

app.get("/", (req, res) => {
  return res.json({ message: "hello" });
});
