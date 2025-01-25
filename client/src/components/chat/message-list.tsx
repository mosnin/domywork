import { Message } from "./message";
import TypingIndicator from "./typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message as MessageType } from "@/lib/chat";

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}