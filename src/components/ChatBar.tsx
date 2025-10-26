import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatBarProps {
  onSend: (question: string) => void;
  disabled?: boolean;
}

export const ChatBar = ({ onSend, disabled }: ChatBarProps) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSend(question.trim());
      setQuestion("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-secondary rounded-full p-2"
    >
      <Input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="flex-1 bg-transparent border-0 focus-visible:ring-0 px-4"
        disabled={disabled}
        aria-label="Ask a question"
      />
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90"
        disabled={disabled || !question.trim()}
        aria-label="Send question"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
