'use client';

import React, { useState, useEffect } from 'react';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

export function GlobalStatusBar() {
  const [online, setOnline] = useState(true);
  const [latency, setLatency] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);

  // Poll /api/health to calculate response metrics
  useEffect(() => {
    const checkHealth = async () => {
      const start = Date.now();
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiBase}/api/health`, { cache: 'no-store' });
        if (res.ok) {
          setOnline(true);
          setLatency(Date.now() - start);
        } else {
          setOnline(false);
        }
      } catch {
        setOnline(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Universal toggle shortcut listener
  useKeyboardShortcut('k', (e) => {
    if (e.ctrlKey || e.metaKey) {
      setModalOpen((prev) => !prev);
    }
  }, true);

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shrink-0"
    >
      <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-[10px] font-black tracking-wide uppercase text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span>API: {online ? 'Online' : 'Offline'}</span>
          </div>
          {online && <span>Ping: {latency}ms</span>}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-0.5 rounded transition-all text-slate-500 hover:text-navy dark:hover:text-white"
          title="Show keyboard shortcuts menu"
        >
          <span>⌨️ Ctrl+K</span>
        </button>
      </div>

      <KeyboardShortcutsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
export default GlobalStatusBar;
