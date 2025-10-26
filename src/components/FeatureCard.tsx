import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  image: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const FeatureCard = ({ image, title, subtitle, onClick }: FeatureCardProps) => {
  return (
    <Card
      className="group overflow-hidden cursor-pointer bg-card border-border hover-lift"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick()}
      aria-label={`Explore: ${title}`}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};
