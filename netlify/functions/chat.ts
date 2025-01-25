import { Handler } from "@netlify/functions";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message, context = "" } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing message in request body" }),
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI-powered homework assistant specializing in ${context || "general subjects"}. 
                   Provide clear, step-by-step explanations and ensure responses are educational and help students understand concepts deeply.
                   When providing solutions, break down complex problems into manageable parts and explain the reasoning behind each step.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: response.choices[0].message.content,
        status: "success",
      }),
    };
  } catch (error: any) {
    console.error("Chat error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process your request",
        details: error.message,
      }),
    };
  }
};
