interface LogoRingProps {
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export const LogoRing = ({ animate = false, size = "md", withText = false }: LogoRingProps) => {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className="flex items-center gap-3">
      <svg
        className={`${sizes[size]} ${animate ? "animate-pulse-rings" : ""}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="36" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
        <circle cx="50" cy="50" r="27" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
        <circle cx="50" cy="50" r="18" stroke="hsl(var(--primary))" strokeWidth="2.5" opacity="0.8" />
        <circle cx="50" cy="50" r="9" stroke="hsl(var(--primary))" strokeWidth="3" opacity="1" />
      </svg>
      {withText && (
        <div className="flex flex-col">
          <span className="text-2xl font-semibold tracking-wider text-foreground">ECHOES</span>
          <span className="text-xs text-muted-foreground tracking-wide">Talk to History</span>
        </div>
      )}
    </div>
  );
};
