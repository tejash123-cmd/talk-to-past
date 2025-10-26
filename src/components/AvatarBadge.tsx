interface AvatarBadgeProps {
  name: string;
  imageUrl?: string;
}

export const AvatarBadge = ({ name, imageUrl }: AvatarBadgeProps) => {
  return (
    <div className="absolute bottom-20 right-8 flex flex-col items-center gap-2 animate-scale-in">
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-4xl font-bold text-background">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
        {name}
      </div>
    </div>
  );
};
