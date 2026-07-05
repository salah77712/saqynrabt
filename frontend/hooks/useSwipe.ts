'use client';

import { useRef, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 60 }: SwipeHandlers) {
  const startX = useRef(0);
  const startY = useRef(0);
  const isSwiping = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isSwiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      isSwiping.current = false;
      if (dx > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  }, [onSwipeLeft, onSwipeRight, threshold]);

  const onTouchEnd = useCallback(() => {
    isSwiping.current = false;
  }, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
