'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    setOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="sticky top-0 z-[100] bg-amber-500 text-amber-900 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2">
      <WifiOff className="w-3.5 h-3.5" />
      <span>You are offline. Some features may be unavailable.</span>
    </div>
  );
}
