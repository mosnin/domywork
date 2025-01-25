import { Message } from "./message";
import TypingIndicator from "./typing-indicator";
import type { Message as MessageType } from "@/lib/chat";
import { useEffect, useRef } from "react";

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

  return (
    <div 
      ref={scrollRef} 
      className="flex-1 overflow-y-auto"
    >
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
}