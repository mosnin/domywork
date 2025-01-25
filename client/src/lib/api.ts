const API_BASE = import.meta.env.PROD 
  ? "/.netlify/functions"  // In production, use Netlify Functions path
  : "/api";               // In development, use local API

export async function sendChatMessage(message: string, context?: string) {
  try {
    const endpoint = `${API_BASE}/chat`;
    console.log("[Chat Request] Environment:", import.meta.env.PROD ? "production" : "development");
    console.log("[Chat Request] Sending to endpoint:", endpoint);
    console.log("[Chat Request] Payload:", { message, context });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Chat Error] API error response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`Chat API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("[Chat Success] API response:", data);

    if (!data.message) {
      console.error("[Chat Error] Invalid response format:", data);
      throw new Error("Invalid response from chat API");
    }

    return data;
  } catch (error) {
    console.error("[Chat Error] Request failed:", error);
    throw error;
  }
}