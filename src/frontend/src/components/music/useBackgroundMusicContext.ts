import { useContext } from 'react';
import { BackgroundMusicContext } from './BackgroundMusicProvider';

export function useBackgroundMusicContext() {
  const context = useContext(BackgroundMusicContext);
  
  if (!context) {
    throw new Error('useBackgroundMusicContext must be used within BackgroundMusicProvider');
  }
  
  return context;
}
