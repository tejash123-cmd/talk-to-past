import { Button } from "@/components/ui/button";

interface FaqChipsProps {
  faqs: string[];
  onAsk: (question: string) => void;
  disabled?: boolean;
}

export const FaqChips = ({ faqs, onAsk, disabled }: FaqChipsProps) => {
  return (
    <div className="flex flex-wrap md:flex-wrap gap-2 mb-4">
      {faqs.map((faq, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onAsk(faq)}
          disabled={disabled}
          className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap"
          aria-label={`Ask: ${faq}`}
        >
          {faq}
        </Button>
      ))}
    </div>
  );
};
