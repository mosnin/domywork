import { Message } from "./message";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message as MessageType } from "@/lib/chat";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
