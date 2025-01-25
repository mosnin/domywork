import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const clearChat = () => {
    setMessages([]);
    setResponseCount(0);
  };

  const handleNewMessage = async (content: string) => {
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Update messages with user's message first
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      // Update messages with assistant's response
      setMessages([...updatedMessages, assistantMessage]);

      // Update response count and show ad
      setResponseCount((prev) => {
        const newCount = prev + 1;
        // Show ad after first message and every 5 messages thereafter
        if (newCount === 1 || (newCount > 1 && (newCount - 1) % 5 === 0)) {
          setShowAd(true);
        }
        return newCount;
      });
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative flex h-screen">
        <Sidebar onClearChat={clearChat} />
        <main className="flex-1 flex flex-col">
          <MessageList messages={messages} isLoading={isLoading} />
          <div className="border-t border-gray-800">
            <ChatInput onSend={handleNewMessage} disabled={isLoading || showAd} />
          </div>
        </main>
        {showAd && <FullscreenAd onClose={() => setShowAd(false)} />}
      </div>
    </div>
  );
}