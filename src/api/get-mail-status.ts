import { Hono } from "hono";
import Track from "../model/track.model";

const app = new Hono();

app.get('/get-mail-status/:id',async(c)=>{
    const id = c.req.param('id');
    if(!id)return c.json({error:"Tracking ID is required"});
    try {
        const track = await Track.findOne({trackingId:id});
        if(!track) return c.json({erro:"Tracking ID not found"},404);
        return c.json({data:track},201);
    } catch (error) {
        console.error("error while checkiing mail status:",error);
        return c.json({error:"failed to get email status"})
    }
})

export default app;