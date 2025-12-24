import { useState, useEffect, useCallback } from 'react';
import StarField from '@/components/StarField';
import GirlSilhouette from '@/components/GirlSilhouette';
import StrangerSilhouette from '@/components/StrangerSilhouette';
import DreamText from '@/components/DreamText';
import { useAudio } from '@/hooks/useAudio';

type GameState = 'sleeping' | 'crying' | 'awake' | 'judging' | 'playing' | 'tired';

const Index = () => {
  const [state, setState] = useState<GameState>('sleeping');
  const [textLines, setTextLines] = useState<string[]>([]);
  const [showStranger, setShowStranger] = useState(false);
  const [strangerFading, setStrangerFading] = useState(false);
  const [canClick, setCanClick] = useState(true);

  const { playCryingSound, playLaughSound, playPlayfulSound } = useAudio();

  // State transition logic
  const handleClick = useCallback(() => {
    if (!canClick) return;

    switch (state) {
      case 'sleeping':
        setCanClick(false);
        setState('crying');
        setTextLines(['ahhh… why u touched me 😭']);
        playCryingSound();
        
        // Auto transition to awake after 4 seconds
        setTimeout(() => {
          setState('awake');
          setTextLines(['wait… am i sleeping or what?']);
          setCanClick(true);
        }, 4500);
        break;

      case 'awake':
        setCanClick(false);
        setState('judging');
        playLaughSound();
        
        // Show text line by line
        setTextLines(['😂']);
        setTimeout(() => setTextLines(['😂', 'what IS this']), 2000);
        setTimeout(() => setTextLines(['😂', 'what IS this', 'who are u?']), 4000);
        
        // Auto transition to playing
        setTimeout(() => {
          setState('playing');
          setShowStranger(true);
          setTextLines(['okay fine… play a bit']);
          playPlayfulSound();
        }, 8000);
        
        // Auto transition to tired after playing
        setTimeout(() => {
          setStrangerFading(true);
        }, 25000);
        
        setTimeout(() => {
          setState('tired');
          setShowStranger(false);
          setStrangerFading(false);
          setTextLines(['okay stop.']);
        }, 28000);
        
        setTimeout(() => {
          setTextLines(['okay stop.', "i'm tired now."]);
        }, 30000);
        
        setTimeout(() => {
          setTextLines(['okay stop.', "i'm tired now.", 'going to sleep 😴']);
        }, 32000);
        
        // Reset to sleeping
        setTimeout(() => {
          setState('sleeping');
          setTextLines([]);
          setCanClick(true);
        }, 36000);
        break;

      case 'tired':
        // Can restart the loop
        setState('sleeping');
        setTextLines([]);
        break;

      default:
        break;
    }
  }, [state, canClick, playCryingSound, playLaughSound, playPlayfulSound]);

  return (
    <div 
      className="min-h-screen w-full relative cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Background */}
      <StarField />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Characters container */}
        <div className="relative flex items-end justify-center gap-16 mb-16">
          {/* Girl */}
          <div className="animate-float" style={{ animationDuration: '8s' }}>
            <GirlSilhouette state={state} />
          </div>

          {/* Stranger */}
          <div className="absolute right-[-150px] md:right-[-180px] bottom-0">
            <StrangerSilhouette 
              visible={showStranger} 
              fading={strangerFading}
            />
          </div>
        </div>

        {/* Text */}
        <div className="h-32">
          <DreamText lines={textLines} />
        </div>

        {/* Subtle hint when sleeping */}
        {state === 'sleeping' && canClick && (
          <p 
            className="absolute bottom-8 text-muted-foreground/40 text-sm animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            click anywhere
          </p>
        )}
      </div>

      {/* SEO */}
      <h1 className="sr-only">a useless dream - interactive art experience</h1>
    </div>
  );
};

export default Index;
