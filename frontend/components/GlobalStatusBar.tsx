'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

type Status = 'loading' | 'online' | 'offline';

export function GlobalStatusBar() {
const [status, setStatus] = useState<Status>('loading');
const [latency, setLatency] = useState(0);
const [modalOpen, setModalOpen] = useState(false);
const [hovered, setHovered] = useState(false);

const checkHealth = useCallback(async () => {
const start = Date.now();
try {
  const res = await fetch('/api/health', { cache: 'no-store' });
  if (res.ok) {
  setLatency(Date.now() - start);
  setStatus('online');
  } else {
  setStatus('offline');
  }
} catch {
  setStatus('offline');
}
}, []);

useEffect(() => {
checkHealth();
const interval = setInterval(checkHealth, 60000);
return () => clearInterval(interval);
}, [checkHealth]);

useKeyboardShortcut('k', (e) => {
if (e.ctrlKey || e.metaKey) {
  setModalOpen((prev) => !prev);
}
}, true);

if (status === 'loading') return null;

return (
  <KeyboardShortcutsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
);
}

export default GlobalStatusBar;
