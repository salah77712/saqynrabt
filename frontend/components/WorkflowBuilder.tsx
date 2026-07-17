'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';
import { Trash2, ArrowDown } from 'lucide-react';

interface StepNode {
  id: string;
  type: 'trigger' | 'action';
  label: string;
}

export function WorkflowBuilder() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [nodes, setNodes] = useState<StepNode[]>([
{ id: '1', type: 'trigger', label: 'incoming_call_created' },
{ id: '2', type: 'action', label: 'dispatch_slack_notification' },
]);

const handleAddNode = (type: 'action') => {
const labels = {
  action: 'dispatch_webhook_outbound',
};
const mockNew: StepNode = {
  id: `${Date.now()}`,
  type,
  label: labels[type],
};
setNodes(prev => [...prev, mockNew]);
};

const handleRemoveNode = (id: string) => {
setNodes(prev => prev.filter(n => n.id !== id));
};

return (
<div className="border border-primary/10 rounded-xl p-8 bg-surface space-y-6">

{/* Header */}
<div className="flex justify-between items-center">
<div>
<h3 className="text-sm font-extrabold text-primary">{t({ en: 'Visual Pipeline Editor', ar: 'Ù…Ø­Ø±Ø± Ù…Ø³Ø§Ø± Ø§Ù„ØªØ¯ÙÙ‚ Ø§Ù„Ø¨ØµØ±ÙŠ' })}</h3>
<p className="text-[10px] text-primary/60 font-semibold mt-0.5">{t({ en: 'Simulated visual flow editor. Configure pipeline dispatches.', ar: 'Ù…Ø­Ø±Ø± Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø¨ØµØ±ÙŠ. Ù‚Ù… Ø¨ØªÙ‡ÙŠØ¦Ø© Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù…Ù‡Ø§Ù….' })}</p>
</div>
<button
onClick={() => handleAddNode('action')}
className="bg-primary text-white font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
+ Add Action Node
</button>
</div>

{/* Nodes list */}
<div className="flex flex-col items-center gap-8">
{nodes.map((node, idx) => (
<React.Fragment key={node.id}>

{/* Node Card */}
<div className={`w-full max-w-sm bg-surface border border-primary/10 rounded-xl p-4 shadow-sm flex justify-between items-center relative ${
node.type === 'trigger' ? 'border-s-4 border-s-[#2A5CFF]' : 'border-s-4 border-s-[#2A5CFF]'
}`}>
<div>
<span className="text-[9px] font-extrabold uppercase text-primary/60 tracking-widest">{node.type}</span>
<p className="text-xs font-mono font-bold text-primary mt-1">{node.label}</p>
</div>

{node.type !== 'trigger' && (
<button
        onClick={() => handleRemoveNode(node.id)}
        className="text-xs text-primary/60 hover:text-primary transition-all duration-300 p-1 border border-primary/10 hover:border-accent rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
<Trash2 className="w-4 h-4 text-primary/60 hover:text-primary" />
</button>
)}
</div>

{/* Connecting Arrow */}
{idx < nodes.length - 1 && (
<ArrowDown className="w-5 h-5 text-primary/40" />
)}

</React.Fragment>
))}
</div>

</div>
);
}
