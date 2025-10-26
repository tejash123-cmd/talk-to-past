import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  question: string;
  answer: string;
}

interface DiscussionPanelProps {
  messages: Message[];
}

export const DiscussionPanel = ({ messages }: DiscussionPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-card border-l border-border transition-all duration-300 ${
        isOpen ? "w-80 md:w-96" : "w-0"
      } overflow-hidden z-50`}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-10 top-1/2 transform -translate-y-1/2 rounded-l-lg rounded-r-none bg-card border border-r-0 border-border"
        aria-label={isOpen ? "Close discussion panel" : "Open discussion panel"}
      >
        {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="h-full flex flex-col p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Discussion</h2>
          <ScrollArea className="flex-1">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ask questions to start a discussion
              </p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground mb-1">You:</p>
                      <p className="text-sm text-foreground">{msg.question}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <p className="text-sm font-semibold text-primary mb-1">Guide:</p>
                      <p className="text-sm text-foreground">{msg.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
