import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ValentinesCountdown from '../ValentinesCountdown';
import FloatingHeartsEffect from '../effects/FloatingHeartsEffect';
import { valentineContent } from '../../content/valentineContent';
import { useState, useRef } from 'react';

export default function HeroSection() {
  const [showHearts, setShowHearts] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleWhatsAppRedirect = () => {
    // Capture button position for hearts origin
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    // Trigger hearts effect immediately
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 4000);

    // WhatsApp deep link with pre-filled message
    const phoneNumber = '918778853617';
    const message = 'I LOVE YOU AD❤️';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab/window (works for both mobile app and desktop web)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-red-950/20" />
      
      {/* Hero image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
        <img 
          src="/assets/generated/valentine-hero.dim_1600x900.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-4 mb-4">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" style={{ animationDelay: '0ms' }} />
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse" style={{ animationDelay: '150ms' }} />
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rose-600 dark:text-rose-400 tracking-tight">
          {valentineContent.hero.headline}
        </h1>
        
        <p className="text-2xl sm:text-3xl md:text-4xl text-rose-800 dark:text-rose-300 font-light">
          {valentineContent.hero.subheadline}
        </p>
        
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          {valentineContent.hero.message}
        </p>

        {/* Countdown */}
        <div className="pt-8">
          <ValentinesCountdown />
        </div>

        {/* Interactive button with WhatsApp redirect */}
        <div className="pt-4">
          <Button 
            ref={buttonRef}
            onClick={handleWhatsAppRedirect}
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            I LOVE YOU ❤️
          </Button>
        </div>
      </div>

      {/* Floating hearts effect */}
      {showHearts && <FloatingHeartsEffect mode="burst" origin={buttonPosition} />}
    </section>
  );
}
