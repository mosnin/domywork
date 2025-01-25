const API_BASE = import.meta.env.PROD 
  ? "/.netlify/functions"
  : "/api";

export async function sendChatMessage(message: string, context?: string) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, context }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
