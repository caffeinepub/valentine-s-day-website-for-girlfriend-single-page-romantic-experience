import { useEffect, useRef, useState } from 'react';

export function useBackgroundMusic(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.3; // Soft background volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const startMusic = async () => {
    if (audioRef.current && !isPlaying) {
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

  return {
    isMuted,
    isPlaying,
    playbackBlocked,
    startMusic,
    toggleMute,
    pause,
    resume
  };
}
