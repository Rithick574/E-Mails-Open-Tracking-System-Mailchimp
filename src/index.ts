import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { dbConnect } from "./config/db.config";

const app = new Hono();

app.use(cors());

dbConnect();

app.use(etag(), logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
