const API_BASE = import.meta.env.PROD 
  ? "/.netlify/functions"
  : "/api";

export async function sendChatMessage(message: string, context?: string) {
  try {
    console.log("Sending chat message to:", `${API_BASE}/chat`);

    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chat API error:", errorText);
      throw new Error(`Chat API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Chat API response:", data);

    if (!data.message) {
      throw new Error("Invalid response from chat API");
    }

    return data;
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    throw error;
  }
}