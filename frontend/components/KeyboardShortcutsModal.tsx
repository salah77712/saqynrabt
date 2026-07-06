'use client';

import React, { useState } from 'react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const [search, setSearch] = useState('');

  // Universal hotkeys listener
  useKeyboardShortcut('k', (e) => {
    if (e.ctrlKey || e.metaKey) {
      onClose();
    }
  }, true);

  useKeyboardShortcut('Escape', () => onClose());

  if (!isOpen) return null;

  const shortcuts = [
    { keys: 'Ctrl + K', desc: 'Toggle keyboard shortcuts menu' },
    { keys: 'Shift + G', desc: 'Navigate to overview dashboard' },
    { keys: 'Shift + C', desc: 'Open internal knowledge chatbot' },
    { keys: 'Shift + A', desc: 'Open client automation queue' },
    { keys: 'Esc', desc: 'Close dialog menu overlay' },
  ];

  const filtered = shortcuts.filter(
    (s) =>
      s.desc?.toLowerCase().includes(search?.toLowerCase()) ||
      s.keys?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        className="max-w-xl w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl p-6 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="shortcuts-title" className="text-sm font-black text-navy dark:text-white uppercase tracking-wider">
            Keyboard Shortcuts Console
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs">
            ✕
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search shortcuts..."
          className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy focus:bg-white mb-4 dark:text-white"
        />

        <div className="space-y-2">
          {filtered.map((s, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-gray-50 dark:border-slate-800/50 py-2.5 last:border-b-0 text-xs font-bold text-navy dark:text-slate-300"
            >
              <span>{s.desc}</span>
              <kbd className="bg-slate-100 dark:bg-slate-800 rounded px-2.5 py-1 text-[10px] font-mono border border-gray-200/50 dark:border-slate-700">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default KeyboardShortcutsModal;
