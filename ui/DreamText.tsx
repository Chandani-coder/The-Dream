import { cn } from '@/lib/utils';

interface DreamTextProps {
  lines: string[];
  className?: string;
}

const DreamText = ({ lines, className }: DreamTextProps) => {
  if (lines.length === 0) return null;

  return (
    <div className={cn("text-center space-y-2", className)}>
      {lines.map((line, index) => (
        <p 
          key={index}
          className="text-foreground/80 text-lg md:text-xl font-light tracking-wide animate-text-appear"
          style={{
            animationDelay: `${index * 0.8}s`,
            opacity: 0,
            animationFillMode: 'forwards',
            textShadow: '0 0 20px hsl(var(--primary) / 0.5)',
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default DreamText;
