'use client';

import React from 'react';
import { useGlobalToast } from '../lib/toast';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

export function GlobalToast() {
const { toasts, removeToast } = useGlobalToast();

if (toasts.length === 0) return null;

return (
<div className="fixed bottom-4 right-4 z-[100] space-y-2 max-w-sm w-full">
{toasts.map((t) => (
<div
key={t.id}
className="flex items-center gap-8 bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#141F33]/30 shadow-xl rounded-xl p-4 transition-all animate-slideUp"
>
<span className="text-base">
{t.type === 'success' ? <Check className="text-[#2A5CFF] w-4 h-4" /> : t.type === 'error' ? <X className="text-[#141F33] w-4 h-4" /> : t.type === 'warning' ? <AlertTriangle className="text-[#2A5CFF] w-4 h-4" /> : <Info className="text-[#2A5CFF] w-4 h-4" />}
</span>
<p className="text-xs font-semibold text-[#141F33] dark:text-[#F8F9FB] flex-1 leading-relaxed">
{t.message}
</p>
{t.onUndo && (
<button
onClick={() => {
if (t.onUndo) t.onUndo();
removeToast(t.id);
}}
className="text-xs font-extrabold text-[#2A5CFF] hover:text-[#141F33] dark:hover:text-[#F8F9FB] underline"
>
Undo
</button>
)}
<button
onClick={() => removeToast(t.id)}
className="text-xs font-bold text-[#141F33]/40 hover:text-[#141F33] min-h-[44px] min-w-[44px]"
                  aria-label="Close notification"
>
<X className="w-3 h-3" />
</button>
</div>
))}
</div>
);
}
export default GlobalToast;
