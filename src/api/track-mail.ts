import { Hono } from "hono";

const app = new Hono()

app.get('track-mail/:id',async(c)=>{
     const id = c.req.param('id');
    })

export default app;