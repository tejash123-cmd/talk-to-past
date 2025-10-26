import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoRing } from "@/components/LogoRing";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AvatarBadge } from "@/components/AvatarBadge";
import { ChatBar } from "@/components/ChatBar";
import { SpeechBubble } from "@/components/SpeechBubble";
import { FaqChips } from "@/components/FaqChips";
import { DiscussionPanel } from "@/components/DiscussionPanel";
import { fetchChatAnswer } from "@/lib/mockApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LocationState {
  storyData: {
    brief: string;
    story: string;
    faq: string[];
    video_url?: string;
  };
  topic: string;
}

const Player = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const state = location.state as LocationState;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ question: string; answer: string }>>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    if (!state?.storyData) {
      navigate("/start");
    }
  }, [state, navigate]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleAsk = async (question: string) => {
    setIsPlaying(false);
    setIsLoadingAnswer(true);

    try {
      const response = await fetchChatAnswer(state.storyData.story, question);
      setCurrentAnswer(response.answer);
      setMessages((prev) => [...prev, { question, answer: response.answer }]);

      // Auto-resume after 3 seconds
      setTimeout(() => {
        setCurrentAnswer(null);
        setIsPlaying(true);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  const handleContinue = () => {
    setCurrentAnswer(null);
    setIsPlaying(true);
  };

  if (!state?.storyData) return null;

  const { storyData, topic } = state;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/start")}
              aria-label="Back to start"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <LogoRing size="sm" />
          </div>
          <h2 className="text-sm md:text-base font-semibold text-foreground truncate max-w-md">
            {topic}
          </h2>
        </div>
      </header>

      {/* Main Player Area */}
      <main className="container mx-auto px-4 md:px-8 pt-28 pb-48">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Brief */}
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed">{storyData.brief}</p>
          </div>

          {/* Video Player with Avatar */}
          <div className="relative animate-scale-in">
            <VideoPlayer
              videoUrl={storyData.video_url}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
            />
            <AvatarBadge name={topic.split(" ")[0]} />
            {currentAnswer && (
              <SpeechBubble answer={currentAnswer} onContinue={handleContinue} />
            )}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Chat Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-4">
          <FaqChips
            faqs={storyData.faq}
            onAsk={handleAsk}
            disabled={isLoadingAnswer || !!currentAnswer}
          />
          <ChatBar onSend={handleAsk} disabled={isLoadingAnswer || !!currentAnswer} />
        </div>
      </div>

      {/* Discussion Panel */}
      <DiscussionPanel messages={messages} />
    </div>
  );
};

export default Player;
