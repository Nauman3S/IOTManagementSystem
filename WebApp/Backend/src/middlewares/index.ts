import cors from "cors";
import { Express, json, urlencoded } from "express";
import morgan from "morgan";

/**
 * Top Level Middlewares
 *
 * `CORS`
 *
 * `express.json`
 *
 * `urlencoded`
 *
 * `morgan`
 */
export default function (app: Express): void {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(json({}));
  app.use(urlencoded({ extended: true }));
}
