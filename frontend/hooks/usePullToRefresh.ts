'use client';

import { useState, useRef, useCallback } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export function usePullToRefresh({ onRefresh, threshold = 60 }: UsePullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling.current || refreshing) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 120));
    }
  }, [refreshing]);

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current || refreshing) return;
    pulling.current = false;

    if (pullDistance >= threshold) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold, refreshing, onRefresh]);

  return {
    pullDistance,
    refreshing,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    pullContainerStyle: {
      transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'translateY(0)',
      transition: pullDistance === 0 && !refreshing ? 'transform 0.3s ease' : 'none',
    } as React.CSSProperties,
  };
}
