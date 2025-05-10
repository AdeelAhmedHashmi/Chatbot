import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { marked } from "marked"

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

const API_KEY = "AIzaSyBf35EnvfdCKSbsZJBrQprtOp2tEskBUPY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            }),
        });

        const data = await response.json();
        const botReply = marked.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.");

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});