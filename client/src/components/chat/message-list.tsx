import { Message } from "./message";
import TypingIndicator from "./typing-indicator";
import type { Message as MessageType } from "@/lib/chat";
import { useEffect, useRef } from "react";
import AdSenseBanner from "../ads/adsense-banner";

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    // Use a small timeout to ensure content is rendered
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Track the number of AI responses to determine when to show ads
  let aiResponseCount = 0;

  return (
    <div 
      ref={scrollRef} 
      className="flex-1 overflow-y-auto"
    >
      <div className="flex flex-col divide-y divide-border">
        {messages.map((message, index) => {
          const elements = [];
          elements.push(
            <Message key={`msg-${index}`} message={message} />
          );

          // If it's an AI response, increment the counter
          if (message.role === "assistant") {
            aiResponseCount++;
            // Add banner after every other AI response
            if (aiResponseCount % 2 === 0) {
              elements.push(
                <div key={`ad-${index}`} className="py-1">
                  <AdSenseBanner index={Math.floor(aiResponseCount / 2)} />
                </div>
              );
            }
          }

          return elements;
        })}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
}