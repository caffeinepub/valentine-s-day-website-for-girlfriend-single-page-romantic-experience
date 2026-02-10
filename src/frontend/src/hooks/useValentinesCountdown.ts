import { useState, useEffect } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCelebrating: boolean;
}

export function useValentinesCountdown(): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCelebrating: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Valentine's Day this year
      let valentinesDay = new Date(currentYear, 1, 14, 0, 0, 0); // Month is 0-indexed, so 1 = February
      
      // If Valentine's Day has passed this year, target next year
      if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14, 0, 0, 0);
      }
      
      const difference = valentinesDay.getTime() - now.getTime();
      
      // If we're on Valentine's Day (within 24 hours after it starts)
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (difference < 0 && Math.abs(difference) < oneDayInMs) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCelebrating: true
        });
        return;
      }
      
      // Calculate time remaining
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({
          days,
          hours,
          minutes,
          seconds,
          isCelebrating: false
        });
      }
    };

    // Calculate immediately
    calculateCountdown();
    
    // Update every second
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
