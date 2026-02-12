import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, X, Play } from 'lucide-react';
import { valentineContent } from '@/content/valentineContent';
import FloatingHeartsEffect from '@/components/effects/FloatingHeartsEffect';
import SparklesEffect from '@/components/effects/SparklesEffect';
import HeartExplosionEffect from '@/components/effects/HeartExplosionEffect';
import ConfettiEffect from '@/components/effects/ConfettiEffect';
import { useBackgroundMusicContext } from '@/components/music/useBackgroundMusicContext';

interface QuestionJourneySectionProps {
  onClose: () => void;
}

export default function QuestionJourneySection({ onClose }: QuestionJourneySectionProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = start screen
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  
  // Use global music context instead of local audio instance
  const { isMuted, isPlaying, playbackBlocked, toggleMute, startMusic, resume } = useBackgroundMusicContext();
  
  const { partnerName, questions, celebrationMessage } = valentineContent.questionJourney;
  const totalSteps = questions.length;
  const isFinalStep = currentStep === totalSteps - 1;

  // Reset No button position when step changes
  useEffect(() => {
    setNoButtonOffset({ x: 0, y: 0 });
  }, [currentStep]);

  // Start the journey
  const handleStart = () => {
    setCurrentStep(0);
    startMusic();
  };

  // Handle "Yes" button click
  const handleYes = () => {
    if (isFinalStep) {
      // Final step: trigger celebration
      setShowCelebration(true);
    } else {
      // Steps 1-5: advance to next step
      if (currentStep === totalSteps - 2) {
        // Before final reveal, add a pause
        setCurrentStep(currentStep + 1);
        setTimeout(() => {
          setShowFinalReveal(true);
        }, 800);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Handle "No" button escape behavior - applies to ALL question steps
  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const container = document.getElementById('journey-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const maxX = rect.width / 2 - 100; // Escape within reasonable bounds
    const maxY = rect.height / 2 - 100;
    
    // Generate random offset from center position
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    
    setNoButtonOffset({ x: newX, y: newY });
  };

  // Get current question text with name substitution
  const getCurrentQuestion = () => {
    if (currentStep < 0 || currentStep >= questions.length) return '';
    return questions[currentStep].replace('{name}', partnerName);
  };

  // Reset animation key when step changes
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentStep]);

  return (
    <div 
      id="journey-container"
      className="fixed inset-0 z-50 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950 overflow-hidden"
    >
      {/* Ambient Effects */}
      <FloatingHeartsEffect />
      <SparklesEffect />
      
      {/* Music Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {playbackBlocked && currentStep >= 0 && (
          <Button
            variant="default"
            size="icon"
            onClick={resume}
            className="rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl animate-pulse"
            title="Start music"
          >
            <Play className="h-5 w-5" />
          </Button>
        )}
        {isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        )}
        {!showCelebration && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Start Screen */}
      {currentStep === -1 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-8 animate-fade-in-zoom">
            <h2 className="text-4xl md:text-6xl font-serif text-primary">
              Ready for something special?
            </h2>
            <Button
              size="lg"
              onClick={handleStart}
              className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 glow-button"
            >
              Let's begin 💕
            </Button>
          </div>
        </div>
      )}

      {/* Question Steps - Both Yes and No buttons appear on ALL steps */}
      {currentStep >= 0 && currentStep < totalSteps && !showCelebration && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div 
            key={animationKey}
            className="text-center space-y-12 max-w-3xl animate-fade-in-zoom"
          >
            <p className={`text-3xl md:text-5xl lg:text-6xl font-serif leading-relaxed ${
              isFinalStep && showFinalReveal ? 'glow-text' : ''
            }`}>
              {getCurrentQuestion()}
            </p>
            
            {/* Both Yes and No buttons for ALL question steps (1-6) */}
            <div className="flex items-center justify-center gap-6">
              <Button
                size="lg"
                onClick={handleYes}
                className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 glow-button z-10"
              >
                Yes ❤️
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                style={{
                  transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  willChange: 'transform'
                }}
                className="text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl escape-button"
              >
                No 🙈
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Screen */}
      {showCelebration && (
        <>
          <HeartExplosionEffect />
          <ConfettiEffect />
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="text-center space-y-8 animate-fade-in-zoom celebration-glow">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary glow-text">
                {celebrationMessage}
              </h2>
              <p className="text-2xl md:text-3xl text-muted-foreground">
                Happy Valentine's Day, {partnerName}! 💖
              </p>
              <Button
                size="lg"
                onClick={onClose}
                className="text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mt-8"
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
