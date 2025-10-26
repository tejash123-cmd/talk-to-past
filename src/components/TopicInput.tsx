import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

export const TopicInput = ({ onSubmit, isLoading }: TopicInputProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[880px] mx-auto flex items-center gap-3 bg-secondary rounded-full p-2 shadow-lg"
    >
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Type any question or name..."
        className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base px-4"
        disabled={isLoading}
        aria-label="Enter historical topic"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full"
        disabled
        aria-label="Voice input (coming soon)"
      >
        <Mic className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90"
        disabled={isLoading || !topic.trim()}
        aria-label="Send question"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
