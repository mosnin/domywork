import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export function registerRoutes(app: Express): Server {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI tutor assisting students with their homework. Provide clear, step-by-step explanations that help students understand the concepts."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      res.json({ message: response.choices[0].message.content });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to process your request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
