import express from "express";
import Thread from "../models/Thread.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "12345",
            title: "Test Thread",
            messages: [
                {
                    role: "user",
                    content: "Hello, how are you?"
                },
                {
                    role: "assistant",
                    content: "I'm good, thank you! How can I assist you today?"
                }
            ]
        });

        const response = await thread.save();

        res.send(response);
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

export default router;