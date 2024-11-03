import { Hono } from "hono";
import { v4 as uuid } from "uuid";
import Track from "../model/track.model";
import { sendMail } from "../utils/sendMail";

const app = new Hono();

app.post("/send-mail", async (c) => {
  const { emails, password } = await c.req.json();
  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return c.json({ error: "Valid email array is required" }, 400);
  }
  if (!password) {
    return c.json({ error: "Password is required" }, 400);
  }
  if (password !== Bun.env.PASSWORD) return c.json({ error: "wrong password" },400);
  const trackingId = uuid();
  try {
    await Track.create({ trackingId });

    await sendMail(emails,trackingId)

    return c.json({ 
      success: true, 
      message: "Emails sent successfully",
      trackingId 
    });
  } catch (error) {
    console.error("Send mail error:", error);
    return c.json({ 
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
});

export default app;
