'use client';

import React from 'react';
import { useGlobalToast } from '../lib/toast';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

export function GlobalToast() {
const { toasts, removeToast } = useGlobalToast();

if (toasts.length === 0) return null;

return (
<div className="fixed bottom-4 end-4 z-[100] space-y-2 max-w-sm w-full">
{toasts.map((t) => (
<div
key={t.id}
className="flex items-center gap-8 bg-surface dark:bg-primary border border-primary/10 dark:border-primary/30 shadow-xl rounded-xl p-4 transition-all animate-slideUp"
>
<span className="text-base">
{t.type === 'success' ? <Check className="text-accent w-4 h-4" /> : t.type === 'error' ? <X className="text-primary w-4 h-4" /> : t.type === 'warning' ? <AlertTriangle className="text-accent w-4 h-4" /> : <Info className="text-accent w-4 h-4" />}
</span>
<p className="text-xs font-semibold text-primary dark:text-surface flex-1 leading-relaxed">
{t.message}
</p>
{t.onUndo && (
<button
onClick={() => {
if (t.onUndo) t.onUndo();
removeToast(t.id);
}}
className="text-xs font-extrabold text-accent hover:text-primary dark:hover:text-surface underline"
>
Undo
</button>
)}
<button
onClick={() => removeToast(t.id)}
className="text-xs font-bold text-primary/40 hover:text-primary min-h-[44px] min-w-[44px]"
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
