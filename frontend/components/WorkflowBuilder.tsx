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
    <div className="border border-gray-200 rounded-2xl p-6 bg-[#F8F9FB] space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Visual Pipeline Editor', ar: 'محرر مسار التدفق البصري' })}</h3>
          <p className="text-[10px] text-[#718096] font-semibold mt-0.5">{t({ en: 'Simulated visual flow editor. Configure pipeline dispatches.', ar: 'محرر سير العمل البصري. قم بتهيئة إرسال المهام.' })}</p>
        </div>
        <button
          onClick={() => handleAddNode('action')}
          className="bg-[#141F33] text-white font-bold py-2 px-4 rounded-xl text-xs"
        >
          + Add Action Node
        </button>
      </div>

      {/* Nodes list */}
      <div className="flex flex-col items-center gap-4">
        {nodes.map((node, idx) => (
          <React.Fragment key={node.id}>
            
            {/* Node Card */}
            <div className={`w-full max-w-sm bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center relative ${
              node.type === 'trigger' ? 'border-l-4 border-l-[#2A5CFF]' : 'border-l-4 border-l-emerald-500'
            }`}>
              <div>
                <span className="text-[9px] font-extrabold uppercase text-[#718096] tracking-widest">{node.type}</span>
                <p className="text-xs font-mono font-bold text-slate-800 mt-1">{node.label}</p>
              </div>
              
              {node.type !== 'trigger' && (
                <button
                  onClick={() => handleRemoveNode(node.id)}
                  className="text-xs text-slate-300 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-slate-300 hover:text-red-500" />
                </button>
              )}
            </div>

            {/* Connecting Arrow */}
            {idx < nodes.length - 1 && (
              <ArrowDown className="w-5 h-5 text-slate-300" />
            )}

          </React.Fragment>
        ))}
      </div>

    </div>
  );
}
