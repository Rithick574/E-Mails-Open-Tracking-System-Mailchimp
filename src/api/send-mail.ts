import { Hono } from "hono";
import { v4 as uuid } from "uuid";
import Track from "../model/track.model";

const app = new Hono();

app.post("/send-mail", async (c) => {
  const { emails, password } = await c.req.json();
  if (!emails || !password)
    return c.json({ error: "Emails and passwords are required" });
  if (password === Bun.env.PASSWORD) return c.json({ error: "wrong password" });
  const trackingId = uuid();
  try {
    await Track.create({trackingId})
  } catch (error) {
    console.log(error);
    return c.json({error:"Failed to send email"})
  }
});

export default app;
