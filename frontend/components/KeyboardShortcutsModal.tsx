'use client';

import React, { useState } from 'react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { X } from 'lucide-react';

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
className="fixed inset-0 bg-[#141F33] backdrop-blur-sm z-[60] flex items-center justify-center p-4"
onClick={onClose}
role="dialog"
aria-modal="true"
aria-labelledby="shortcuts-title"
>
<div
className="max-w-xl w-full bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl shadow-2xl p-8 relative animate-slideUp"
onClick={(e) => e.stopPropagation()}
>
<div className="flex justify-between items-center mb-4">
<h3 id="shortcuts-title" className="text-sm font-black text-[#141F33] uppercase tracking-wider">
Keyboard Shortcuts Console
</h3>
<button onClick={onClose} className="text-[#141F33]/40 hover:text-[#141F33] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors">
<X className="w-4 h-4" />
</button>
</div>

<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Type to search shortcuts..."
className="w-full bg-[#F8F9FB] border-0 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-2 focus:ring-royal focus:bg-[#F8F9FB] mb-4 text-[#141F33]"
/>

<div className="space-y-2">
{filtered.map((s, idx) => (
<div
key={idx}
className="flex justify-between items-center border-b border-[#141F33]/5 py-2.5 last:border-b-0 text-xs font-bold text-[#141F33]"
>
<span>{s.desc}</span>
<kbd className="bg-[#F8F9FB] rounded px-2.5 py-1 text-[10px] font-mono border border-[#141F33]/10">
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
