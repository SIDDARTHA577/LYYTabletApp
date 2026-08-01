import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// Lightweight online/offline signal for the Settings/header sync indicator.
// Web uses the browser's native online/offline events (instant, reliable).
// This build has no backend to reach, so native just reports online — there's
// nothing to poll.
export function useNetworkStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'onLine' in navigator) {
      setOnline(navigator.onLine);
      const goOnline = () => setOnline(true);
      const goOffline = () => setOnline(false);
      window.addEventListener('online', goOnline);
      window.addEventListener('offline', goOffline);
      return () => {
        window.removeEventListener('online', goOnline);
        window.removeEventListener('offline', goOffline);
      };
    }
  }, []);

  return online;
}
