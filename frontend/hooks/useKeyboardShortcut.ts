'use client';

import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  ctrlOrCmd = false
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isKeyMatch = e.key?.toLowerCase() === key?.toLowerCase();
      const isModifierMatch = ctrlOrCmd ? e.ctrlKey || e.metaKey : true;

      if (isKeyMatch && isModifierMatch) {
        e.preventDefault();
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, ctrlOrCmd]);
}
