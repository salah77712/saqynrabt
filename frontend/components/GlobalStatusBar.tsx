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
<>
<div
role="status"
aria-live="polite"
className="fixed bottom-4 right-4 z-[999]"
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
>
<div
className={`bg-[#F8F9FB] border border-[#141F33]/10 shadow-lg rounded-full flex items-center gap-2 transition-all duration-300 ${
hovered ? 'px-4 py-2' : 'px-3 py-1.5'
}`}
>
<span
className={`w-2 h-2 rounded-full flex-shrink-0 ${
status === 'online' ? 'bg-[#2A5CFF] animate-pulse' : 'bg-[#141F33]'
}`}
/>

{status === 'online' && (
<span className="text-xs text-[#141F33]/50 whitespace-nowrap select-none">
{hovered && latency > 0 ? `${latency}ms` : 'All systems operational'}
</span>
)}

{status === 'offline' && (
<span className="text-xs text-[#141F33]/50 whitespace-nowrap select-none">
Offline. Retrying...
</span>
)}

{status === 'offline' && (
<button
onClick={checkHealth}
className="text-xs font-semibold text-[#2A5CFF] hover:text-[#141F33] whitespace-nowrap"
>
Retry
</button>
)}
</div>
</div>

<KeyboardShortcutsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
</>
);
}

export default GlobalStatusBar;
