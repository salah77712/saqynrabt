'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseUnsavedChangesReturn {
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  markClean: () => void;
  showModal: boolean;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
}

export function useUnsavedChanges(
  basePath = '/dashboard/settings'
): UseUnsavedChangesReturn {
  const [isDirty, setIsDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pendingRef = useRef<(() => void) | null>(null);
  const isDirtyRef = useRef(false);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  const setDirty = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  const markClean = useCallback(() => {
    setIsDirty(false);
  }, []);

  const confirmNavigation = useCallback(() => {
    setShowModal(false);
    setIsDirty(false);
    const go = pendingRef.current;
    pendingRef.current = null;
    go?.();
  }, []);

  const cancelNavigation = useCallback(() => {
    setShowModal(false);
    pendingRef.current = null;
  }, []);

  // Browser refresh / tab close
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  // Browser back / forward
  useEffect(() => {
    const handler = () => {
      if (isDirtyRef.current) {
        history.pushState(null, '', window.location.href);
        setShowModal(true);
        pendingRef.current = () => {
          history.back();
        };
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Intercept link clicks leaving settings
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link?.href) return;
      if (!isDirtyRef.current) return;

      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      const isOnSettings = window.location.pathname.startsWith(basePath);
      const isTargetSettings = url.pathname.startsWith(basePath);
      if (!isOnSettings || isTargetSettings) return;

      e.preventDefault();
      e.stopPropagation();
      setShowModal(true);
      pendingRef.current = () => {
        window.location.href = link.href;
      };
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [basePath]);

  return {
    isDirty,
    setDirty,
    markClean,
    showModal,
    confirmNavigation,
    cancelNavigation,
  };
}
