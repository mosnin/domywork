import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import MessageList from "@/components/chat/message-list";
import ChatInput from "@/components/chat/chat-input";
import FullscreenAd from "@/components/ads/fullscreen-ad";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Message } from "@/lib/chat";

export default function Chat() {
  const [messages, setMessages] = useLocalStorage<Message[]>("chat-messages", []);
  const [showAd, setShowAd] = useState(false);
  const [responseCount, setResponseCount] = useState(0);

  const handleNewMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setResponseCount((prev) => {
        const newCount = prev + 1;
        if (newCount % 5 === 0) {
          setShowAd(true);
        }
        return newCount;
      });
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  useEffect(() => {
    if (showAd) {
      const timer = setTimeout(() => {
        setShowAd(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showAd]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        <ChatInput onSend={handleNewMessage} />
      </main>
      {showAd && <FullscreenAd onClose={() => setShowAd(false)} />}
    </div>
  );
}