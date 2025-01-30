import { cn } from "@/lib/utils";
import type { Message } from "@/lib/chat";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        description: "Message copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy message",
      });
    }
  };

  const downloadAsText = () => {
    try {
      const blob = new Blob([message.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-response-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to download message",
      });
    }
  };

  const parseContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the asterisks and wrap in strong tag
        const text = part.slice(2, -2);
        return <strong key={index} className="font-bold">{text}</strong>;
      }
      return part;
    });
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-secondary"
        )}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium mb-1">
          {isUser ? "You" : "Assistant"}
        </div>
        <div className="text-sm whitespace-pre-wrap">
          {parseContent(message.content)}
        </div>
        {!isUser && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={copyToClipboard}
            >
              <Copy className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={downloadAsText}
            >
              <Download className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}