import { useState } from 'react';
import HeroSection from './components/sections/HeroSection';
import LoveLetterSection from './components/sections/LoveLetterSection';
import ReasonsSection from './components/sections/ReasonsSection';
import QuestionJourneySection from './components/sections/QuestionJourneySection';
import Footer from './components/Footer';
import { Button } from './components/ui/button';
import { Heart } from 'lucide-react';

function App() {
  const [showJourney, setShowJourney] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Subtle background pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: 'url(/assets/generated/heart-pattern.dim_2048x2048.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        
        {/* CTA to start the journey */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              size="lg"
              onClick={() => setShowJourney(true)}
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5 fill-current" />
              I have something special to ask you...
            </Button>
          </div>
        </section>
        
        <LoveLetterSection />
        <ReasonsSection />
      </main>
      
      <Footer />
      
      {/* Question Journey Overlay */}
      {showJourney && (
        <QuestionJourneySection onClose={() => setShowJourney(false)} />
      )}
    </div>
  );
}

export default App;
