import { Hono } from "hono";
import { getConnInfo } from "hono/bun";
import Track from "../model/track.model";
import { promises as fs } from "fs";

const app = new Hono();

let imageBuffer: Buffer | null = null;

(async () => {
  try {
    imageBuffer = await fs.readFile(__dirname + "/assets/header.png");
    console.log("Tracking pixel loaded successfully");
  } catch (error) {
    console.error("Failed to load tracking pixel:", error);
    imageBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "base64"
    );
  }
})();

app.get("/track-mail/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Tracking ID is required" }, 400);
  }
  if (!imageBuffer) {
    return c.json({ error: "Tracking system not properly initialized" }, 500);
  }
  const userIP =
  c.req.raw.headers.get("true-client-ip") ||
  c.req.raw.headers.get("cf-connecting-ip") ||
  getConnInfo(c).remote.address ||
  "0.0.0.0";
  
  try {
    const track = await Track.findOne({ trackingId: id });
    if (!track) return c.json({ error: "Tracking ID not found" }, 404);

    //check if the user already opened the email
    if (!track.userIPs.includes(userIP)) {
      track.userIPs.push(userIP);
      track.opens++;
      await track.save();
    }
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Email tracking error:", error);
    return c.json({ error: "Failed to track email" }, 500);
  }
});

export default app;
