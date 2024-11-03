import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { dbConnect } from "./config/db.config";
import trackMailRoute from "./api/track-mail"
import sendMailRoute from "./api/send-mail"
import getMailStatusRoute from "./api/get-mail-status"

const app = new Hono();

//middlewares
app.use(cors());
app.use(etag(), logger());

//db connection
dbConnect();

//routes
app.route('/track',trackMailRoute)
app.route('/api',sendMailRoute)
app.route('/status',getMailStatusRoute)



app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
