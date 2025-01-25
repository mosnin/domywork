import { cn } from "@/lib/utils";

export default function TypingIndicator() {
  return (
    <div className="flex w-full items-start gap-4 p-4 bg-background">
      <div className="size-8 rounded-full bg-secondary flex items-center justify-center">
        AI
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium mb-1">Assistant</div>
        <div className="flex gap-1">
          <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="size-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
