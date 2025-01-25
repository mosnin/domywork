type HandlerEvent = {
  body: string | null;
  httpMethod: string;
};

type HandlerResponse = {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
};

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event: HandlerEvent): Promise<HandlerResponse> {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!event.body) {
      throw new Error("Missing request body");
    }

    console.log("Received chat request body:", event.body);

    const { message, context = "" } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing message in request body" }),
      };
    }

    console.log("Processing chat request:", { message, context });

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

    console.log("OpenAI API response received");

    if (!response.choices[0].message.content) {
      throw new Error("No response generated from OpenAI API");
    }

    const result = {
      message: response.choices[0].message.content,
      status: "success",
    };

    console.log("Sending successful response");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error("Chat error:", error);

    // Check if it's an OpenAI API error
    if (error.response?.status) {
      return {
        statusCode: error.response.status,
        headers,
        body: JSON.stringify({
          error: "OpenAI API Error",
          details: error.response.data?.error?.message || error.message,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to process your request",
        details: error.message,
      }),
    };
  }
}