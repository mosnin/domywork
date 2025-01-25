import { Message } from "./message";
import TypingIndicator from "./typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <ScrollArea ref={scrollRef} className="flex-1">
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}