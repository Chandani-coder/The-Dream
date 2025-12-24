import { cn } from '@/lib/utils';

interface GirlSilhouetteProps {
  state: 'sleeping' | 'crying' | 'awake' | 'judging' | 'playing' | 'tired';
  className?: string;
}

const GirlSilhouette = ({ state, className }: GirlSilhouetteProps) => {
  const isLying = state === 'sleeping' || state === 'crying' || state === 'tired';
  const isFlickering = state === 'judging';

  return (
    <div className={cn("relative", className)}>
      {/* Bed - abstract floating platform */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-8 rounded-full opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--glow-girl) / 0.3), transparent)',
          boxShadow: '0 0 40px 20px hsl(var(--glow-girl) / 0.1)',
        }}
      />

      {/* Girl silhouette container */}
      <div 
        className={cn(
          "relative transition-all duration-1000",
          isLying ? "rotate-[-10deg]" : "rotate-0",
          state === 'awake' && "animate-sit-up",
          state === 'tired' && "animate-lie-down",
          isFlickering && "animate-flicker"
        )}
      >
        {/* Glow aura */}
        <div 
          className="absolute inset-0 animate-breathe"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--glow-girl) / 0.4) 0%, transparent 70%)',
            width: '200px',
            height: '280px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Head */}
        <div 
          className={cn(
            "relative w-20 h-24 rounded-full mx-auto",
            "animate-pulse-glow"
          )}
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, hsl(var(--glow-girl) / 0.8) 0%, hsl(var(--glow-girl) / 0.3) 60%, transparent 100%)',
            boxShadow: '0 0 60px 20px hsl(var(--glow-girl) / 0.3)',
          }}
        >
          {/* Eyes - only visible when awake */}
          {!isLying && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="w-2 h-2 rounded-full bg-background opacity-80" />
              <div className="w-2 h-2 rounded-full bg-background opacity-80" />
            </div>
          )}
        </div>

        {/* Body */}
        <div 
          className="relative w-16 h-32 rounded-t-full rounded-b-3xl mx-auto -mt-2"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--glow-girl) / 0.6) 0%, hsl(var(--glow-girl) / 0.2) 100%)',
            boxShadow: '0 0 40px 10px hsl(var(--glow-girl) / 0.2)',
          }}
        />

        {/* Subtle arm shapes */}
        <div 
          className="absolute w-10 h-24 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--glow-girl) / 0.4) 0%, transparent 100%)',
            top: '90px',
            left: 'calc(50% - 50px)',
            transform: isLying ? 'rotate(30deg)' : 'rotate(10deg)',
          }}
        />
        <div 
          className="absolute w-10 h-24 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--glow-girl) / 0.4) 0%, transparent 100%)',
            top: '90px',
            right: 'calc(50% - 50px)',
            transform: isLying ? 'rotate(-30deg)' : 'rotate(-10deg)',
          }}
        />
      </div>
    </div>
  );
};

export default GirlSilhouette;
