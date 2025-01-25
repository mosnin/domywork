import * as crypto from "crypto";
import OpenAI from "openai";

type HandlerEvent = {
  body: string | null;
  httpMethod: string;
  path: string;
};

type HandlerResponse = {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const requestId = crypto.randomBytes(4).toString('hex');
  console.log(`[${requestId}] Received ${event.httpMethod} request to ${event.path}`);

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== "POST") {
    console.log(`[${requestId}] Invalid method: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Validate API key
  if (!process.env.OPENAI_API_KEY) {
    console.error(`[${requestId}] Missing OPENAI_API_KEY environment variable`);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Server configuration error", 
        details: "API key not configured"
      }),
    };
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (!event.body) {
      console.error(`[${requestId}] Missing request body`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing request body" }),
      };
    }

    console.log(`[${requestId}] Parsing request body`);
    const { message, context = "" } = JSON.parse(event.body);

    if (!message) {
      console.error(`[${requestId}] Missing message in request body`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing message in request body" }),
      };
    }

    // First test the API key with a minimal request
    try {
      console.log(`[${requestId}] Testing OpenAI connection...`);
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 5
      });
      console.log(`[${requestId}] OpenAI connection test successful`);
    } catch (error: any) {
      console.error(`[${requestId}] OpenAI connection test failed:`, error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "OpenAI API connection failed",
          details: error.message
        })
      };
    }

    console.log(`[${requestId}] Processing chat request:`, { context });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI-powered homework assistant specializing in ${context || "general subjects"}. 
                   Provide clear, step-by-step explanations and ensure responses are educational and help students understand concepts deeply.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    if (!response.choices[0].message.content) {
      throw new Error("No response generated");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: response.choices[0].message.content,
        status: "success"
      })
    };

  } catch (error: any) {
    console.error(`[${requestId}] Error:`, error);

    if (error.response?.status) {
      return {
        statusCode: error.response.status,
        headers,
        body: JSON.stringify({
          error: "OpenAI API Error",
          details: error.response.data?.error?.message || error.message
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        details: error.message
      })
    };
  }
}