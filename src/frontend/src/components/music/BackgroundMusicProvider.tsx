import { createContext, useEffect, useRef, useState, ReactNode } from 'react';
import { valentineContent } from '@/content/valentineContent';

interface BackgroundMusicContextValue {
  isMuted: boolean;
  isPlaying: boolean;
  playbackBlocked: boolean;
  startMusic: () => Promise<void>;
  toggleMute: () => void;
  pause: () => void;
  resume: () => Promise<void>;
}

export const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

interface BackgroundMusicProviderProps {
  children: ReactNode;
}

export function BackgroundMusicProvider({ children }: BackgroundMusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    // Create single global audio element
    const audio = new Audio(valentineContent.questionJourney.backgroundMusicPath);
    audio.loop = true;
    audio.volume = 0.3; // Soft background volume
    audioRef.current = audio;

    // Handle audio errors gracefully
    const handleError = () => {
      console.log('Audio failed to load');
      setPlaybackBlocked(true);
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setPlaybackBlocked(false);
      } catch (err) {
        console.log('Audio playback blocked:', err);
        setIsPlaying(false);
        setPlaybackBlocked(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setPlaybackBlocked(false);
      } catch (err) {
        console.log('Audio playback failed:', err);
        setIsPlaying(false);
        setPlaybackBlocked(true);
      }
    }
  };

  const value: BackgroundMusicContextValue = {
    isMuted,
    isPlaying,
    playbackBlocked,
    startMusic,
    toggleMute,
    pause,
    resume
  };

  return (
    <BackgroundMusicContext.Provider value={value}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}
