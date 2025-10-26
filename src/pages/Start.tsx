import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoRing } from "@/components/LogoRing";
import { FeatureCard } from "@/components/FeatureCard";
import { TopicInput } from "@/components/TopicInput";
import { fetchStory } from "@/lib/mockApi";
import { useToast } from "@/hooks/use-toast";

const featuredTopics = [
  {
    title: "Walk through Ancient Rome with Julius Caesar",
    subtitle: "Experience the grandeur of the Roman Empire",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    topic: "Julius Caesar and Ancient Rome",
  },
  {
    title: "Witness the fall of the Berlin Wall",
    subtitle: "November 9, 1989 - A night that changed the world",
    image: "https://images.unsplash.com/photo-1599493758267-c6c884c7071f?w=800&q=80",
    topic: "Fall of the Berlin Wall",
  },
  {
    title: "Ask Cleopatra about life in Egypt",
    subtitle: "Discover the mysteries of ancient Egyptian royalty",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80",
    topic: "Cleopatra and Ancient Egypt",
  },
];

const Start = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    try {
      const storyData = await fetchStory(topic);
      navigate("/player", { state: { storyData, topic } });
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't reach Echoes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <LogoRing withText size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 pt-32 pb-32">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight max-w-4xl mx-auto">
              What moment in history would you like to explore today?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-generated stories, videos, and conversations with the past.
            </p>
          </section>

          {/* Featured Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
            {featuredTopics.map((topic, idx) => (
              <FeatureCard
                key={idx}
                image={topic.image}
                title={topic.title}
                subtitle={topic.subtitle}
                onClick={() => handleTopicSubmit(topic.topic)}
              />
            ))}
          </section>
        </div>
      </main>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-6">
        <div className="container mx-auto px-4 md:px-8">
          <TopicInput onSubmit={handleTopicSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 pointer-events-none pb-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center text-xs text-muted-foreground">
          <span>© Echoes {new Date().getFullYear()}</span>
          <div className="flex gap-4 pointer-events-auto">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Start;
