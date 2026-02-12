import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { useBackgroundMusicContext } from './useBackgroundMusicContext';

export default function PersistentMusicControls() {
  const { isMuted, isPlaying, playbackBlocked, toggleMute, resume } = useBackgroundMusicContext();

  // Don't render anything if music hasn't been started yet
  if (!isPlaying && !playbackBlocked) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex gap-2">
      {playbackBlocked && (
        <Button
          variant="default"
          size="icon"
          onClick={resume}
          className="rounded-full shadow-lg hover:shadow-xl animate-pulse"
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
          className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black shadow-lg"
          title={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );
}
