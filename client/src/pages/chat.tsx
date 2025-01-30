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
      <div className="relative flex h-screen">
        <Sidebar onClearChat={clearChat} />
        <main className="flex-1 flex flex-col">
          <div className="p-4 md:p-6 border-b border-yellow-500/20 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="ml-12 md:ml-0">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Decision Buddy AI
                </h1>
                <p className="text-yellow-200/60 text-sm">
                  Your trusted companion for making better choices
                </p>
              </div>
            </div>
          </div>
          <MessageList messages={messages} isLoading={isLoading} />
          <div className="border-t border-yellow-500/20 bg-black/20 backdrop-blur-sm">
            <ChatInput onSend={handleNewMessage} disabled={isLoading || showAd} />
          </div>
        </main>
        {showAd && <FullscreenAd onClose={() => setShowAd(false)} />}
      </div>
    </div>
  );
}