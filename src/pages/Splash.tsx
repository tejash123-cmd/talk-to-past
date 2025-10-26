import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoRing } from "@/components/LogoRing";
import { Button } from "@/components/ui/button";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/start");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
      <div className="relative z-10 flex flex-col items-center">
        <LogoRing animate size="lg" />
        <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-wider text-foreground">
          ECHOES
        </h1>
        <p className="mt-4 text-lg text-muted-foreground tracking-wide">Talk to History</p>
      </div>
      <Button
        variant="ghost"
        onClick={() => navigate("/start")}
        className="absolute bottom-8 right-8 text-muted-foreground hover:text-foreground"
      >
        Skip
      </Button>
    </div>
  );
};

export default Splash;
