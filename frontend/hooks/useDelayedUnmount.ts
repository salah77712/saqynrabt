'use client';

import { useState, useEffect, useRef } from 'react';

interface UseDelayedUnmountResult {
  shouldRender: boolean;
  isAnimating: boolean;
}

export function useDelayedUnmount(
  isMounted: boolean,
  delay: number = 200
): UseDelayedUnmountResult {
  const [state, setState] = useState<{
    shouldRender: boolean;
    isAnimating: boolean;
  }>({ shouldRender: isMounted, isAnimating: false });

  const prevIsMounted = useRef(isMounted);

  useEffect(() => {
    if (isMounted && !prevIsMounted.current) {
      setState({ shouldRender: true, isAnimating: false });
    } else if (!isMounted && prevIsMounted.current) {
      setState({ shouldRender: true, isAnimating: true });
      const timer = setTimeout(() => {
        setState({ shouldRender: false, isAnimating: false });
      }, delay);
      return () => clearTimeout(timer);
    }
    prevIsMounted.current = isMounted;
  }, [isMounted, delay]);

  return state;
}
