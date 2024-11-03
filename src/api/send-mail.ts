import { Hono } from "hono";

const app = new Hono();

app.post("/send-mail", async (c) => {
  const { emails, password } = await c.req.json();
  if (!emails || !password) return c.json({ error: "Emails and passwords are required" });
  if (password === Bun.env.PASSWORD) return c.json({ error: "wrong password" });

});

export default app;
