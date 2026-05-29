import express from "express";
import Thread from "../models/Thread.js";

const router = express.Router();
import getGroqAPIResponse from "../utils/groqai.js";



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

//get all threads
router.get("/thread", async (req, res) => {
    try{
        const threads = await Thread.find({})
            .sort({ updatedAt: -1 });

        res.send(threads);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

router.get("/thread/:threadId", async (req, res) => {
    try{
        const thread = await Thread.findOne({ threadId: req.params.threadId });

        if(!thread){
            return res.status(404).json({
                error: "Thread not found"
            });
        }
 
        res.send(thread.messages);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

router.delete("/thread/:threadId", async (req, res) => {
    try{
        const thread = await Thread.findOneAndDelete({ threadId: req.params.threadId });

        if(!thread){
            return res.status(404).json({
                error: "Thread not found"
            });
        }
 
        res.json({
            message: "Thread deleted successfully"
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

router.post("/chat", async (req, res) => {
        const {threadId , message} = req.body;

        if(!threadId || !message){
            return res.status(404).json({
                error: "Thread not found"
            });
        }
    try{
        let thread = await Thread.findOne({ threadId });

        if(!thread){
            thread = new Thread({
                threadId,
                title: message,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ] 
            });
        }

        else{
            thread.messages.push({
                role: "user",
                content: message
            });
        }

        const assistantResponse = await getGroqAPIResponse(message);

        thread.messages.push({
            role: "assistant",
            content: assistantResponse
        });

        thread.updatedAt = Date.now();

        await thread.save();

        res.json({
            reply : assistantResponse
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

export default router;