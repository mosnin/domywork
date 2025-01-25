import * as crypto from "crypto";
import OpenAI from "openai";

type HandlerEvent = {
  body: string | null;
  httpMethod: string;
};

type HandlerResponse = {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
};

// Add CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export async function handler(event: HandlerEvent): Promise<HandlerResponse> {
  // Generate a request ID for tracking
  const requestId = crypto.randomBytes(4).toString('hex');
  console.log(`[${requestId}] Request received:`, event.httpMethod);

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

  // Check if API key is available and valid format
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

  // Validate API key format
  if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
    console.error(`[${requestId}] Invalid API key format - key should start with 'sk-'`);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server configuration error",
        details: "Invalid API key format"
      }),
    };
  }

  // Log a masked version of the API key for debugging
  const maskedKey = process.env.OPENAI_API_KEY.substring(0, 3) + '...' + 
                    process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4);
  console.log(`[${requestId}] Using API key starting with: ${maskedKey.substring(0, 3)}`);

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (!event.body) {
      console.error(`[${requestId}] Missing request body`);
      throw new Error("Missing request body");
    }

    console.log(`[${requestId}] Parsing request body`);
    const { message, context = "" } = JSON.parse(event.body);

    if (!message) {
      console.error(`[${requestId}] Missing message in parsed body`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing message in request body" }),
      };
    }

    console.log(`[${requestId}] Processing chat request:`, { message, context });

    // Test the OpenAI connection with a simple request first
    try {
      console.log(`[${requestId}] Testing OpenAI connection...`);
      const testResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 5
      });
      console.log(`[${requestId}] OpenAI connection test successful`);
    } catch (openaiError: any) {
      console.error(`[${requestId}] OpenAI connection test failed:`, openaiError);
      throw new Error(`OpenAI connection test failed: ${openaiError.message}`);
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

    console.log(`[${requestId}] OpenAI API response received`);

    if (!response.choices[0].message.content) {
      console.error(`[${requestId}] No content in OpenAI response`);
      throw new Error("No response generated from OpenAI API");
    }

    console.log(`[${requestId}] Processing successful response`);
    const result = {
      message: response.choices[0].message.content,
      status: "success",
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error(`[${requestId}] Chat error:`, error);

    // Check if it's an API key error
    if (error.message?.includes('api_key')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "API Key Error",
          details: "There was an issue with the API key configuration"
        })
      };
    }

    // Check if it's an OpenAI API error
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
        error: "Failed to process your request",
        details: error.message
      })
    };
  }
}