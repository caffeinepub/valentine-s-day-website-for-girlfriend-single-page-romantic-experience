import { Card, CardContent } from '@/components/ui/card';
import { useValentinesCountdown } from '../hooks/useValentinesCountdown';
import { Heart } from 'lucide-react';

export default function ValentinesCountdown() {
  const { days, hours, minutes, seconds, isCelebrating } = useValentinesCountdown();

  if (isCelebrating) {
    return (
      <Card className="inline-block bg-rose-500 border-rose-600 shadow-xl">
        <CardContent className="py-6 px-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
            <p className="text-2xl sm:text-3xl font-bold text-white">
              Happy Valentine's Day! 💕
            </p>
            <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="inline-block bg-card/95 backdrop-blur-sm border-rose-200 dark:border-rose-900 shadow-xl">
      <CardContent className="py-6 px-8">
        <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center">
          Countdown to Valentine's Day
        </p>
        <div className="flex gap-4 sm:gap-6">
          <TimeUnit value={days} label="Days" />
          <TimeUnit value={hours} label="Hours" />
          <TimeUnit value={minutes} label="Minutes" />
          <TimeUnit value={seconds} label="Seconds" />
        </div>
      </CardContent>
    </Card>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-rose-500 text-white rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg">
        <span className="text-2xl sm:text-3xl font-bold">{value}</span>
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-2">{label}</span>
    </div>
  );
}
