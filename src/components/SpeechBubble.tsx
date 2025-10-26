interface SpeechBubbleProps {
  answer: string;
  onContinue: () => void;
}

export const SpeechBubble = ({ answer, onContinue }: SpeechBubbleProps) => {
  return (
    <div className="absolute bottom-32 right-8 max-w-md animate-scale-in">
      <div className="bg-card border-2 border-primary rounded-2xl p-6 shadow-2xl">
        <p className="text-sm text-foreground leading-relaxed mb-4">{answer}</p>
        <button
          onClick={onContinue}
          className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-2 transition-colors"
          aria-label="Continue playback"
        >
          Continue ▶
        </button>
      </div>
      <div className="absolute -bottom-3 right-12 w-6 h-6 bg-card border-r-2 border-b-2 border-primary transform rotate-45" />
    </div>
  );
};
