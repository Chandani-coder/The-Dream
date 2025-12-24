import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  isChristmasLight?: boolean;
}

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate stars with some as Christmas lights
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 80 + 60,
          delay: Math.random() * 40,
          opacity: Math.random() * 0.5 + 0.3,
          isChristmasLight: Math.random() > 0.85, // 15% are Christmas lights
        });
      }
      setStars(newStars);
    };

    // Generate soft snowflakes
    const generateSnow = () => {
      const newSnowflakes: Snowflake[] = [];
      for (let i = 0; i < 40; i++) {
        newSnowflakes.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 15 + 20, // Slow fall: 20-35 seconds
          delay: Math.random() * 20,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
      setSnowflakes(newSnowflakes);
    };

    generateStars();
    generateSnow();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(280 40% 10% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(220 40% 8% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(250 30% 5%) 0%, hsl(240 20% 3%) 100%)
          `
        }}
      />
      
      {/* Stars with some as Christmas lights */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${
            star.isChristmasLight 
              ? 'animate-christmas-twinkle' 
              : 'animate-star-twinkle star'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.isChristmasLight ? `${star.size + 1}px` : `${star.size}px`,
            height: star.isChristmasLight ? `${star.size + 1}px` : `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.isChristmasLight ? `${2 + Math.random() * 2}s` : `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            backgroundColor: star.isChristmasLight 
              ? (star.id % 3 === 0 ? 'hsl(40 80% 60%)' : star.id % 3 === 1 ? 'hsl(0 65% 55%)' : 'hsl(120 50% 50%)')
              : 'hsl(var(--star))',
            boxShadow: star.isChristmasLight 
              ? `0 0 ${star.size * 3}px ${star.id % 3 === 0 ? 'hsl(40 80% 60%)' : star.id % 3 === 1 ? 'hsl(0 65% 55%)' : 'hsl(120 50% 50%)'}`
              : 'none',
          }}
        />
      ))}

      {/* Soft falling snow */}
      {snowflakes.map((flake) => (
        <div
          key={`snow-${flake.id}`}
          className="absolute rounded-full animate-snowfall"
          style={{
            left: `${flake.x}%`,
            top: '-10px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: 'hsl(var(--snow))',
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Nebula clouds with warm Christmas tones */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(280 50% 30%) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(200 50% 25%) 0%, transparent 70%)',
          bottom: '20%',
          right: '-5%',
        }}
      />
      {/* Warm Christmas glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(30 70% 40%) 0%, transparent 70%)',
          bottom: '30%',
          left: '20%',
        }}
      />
    </div>
  );
};

export default StarField;
