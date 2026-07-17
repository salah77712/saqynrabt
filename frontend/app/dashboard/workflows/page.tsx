'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  desc: string;
}

export default function WorkflowsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', type: 'trigger', label: t({en: 'Incoming Guest Phone Call', ar: 'Ù…ÙƒØ§Ù„Ù…Ø© Ù‡Ø§ØªÙÙŠØ© ÙˆØ§Ø±Ø¯Ø© Ù…Ù† Ø¶ÙŠÙ'}), desc: t({en: 'Fires when Vapi webhook detects call.', ar: 'ÙŠØªÙ… ØªØ´ØºÙŠÙ„Ù‡ Ø¹Ù†Ø¯ Ø§ÙƒØªØ´Ø§Ù webhook Vapi Ù„Ù„Ù…ÙƒØ§Ù„Ù…Ø©.'}) },
    { id: '2', type: 'condition', label: t({en: 'Outside Business Hours?', ar: 'Ø®Ø§Ø±Ø¬ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„ØŸ'}), desc: t({en: 'Checks if time is between 6 PM and 8 AM.', ar: 'ÙŠØªØ­Ù‚Ù‚ Ù…Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„ÙˆÙ‚Øª Ø¨ÙŠÙ† 6 Ù…Ø³Ø§Ø¡Ù‹ Ùˆ 8 ØµØ¨Ø§Ø­Ø§Ù‹.'}) },
    { id: '3', type: 'action', label: t({en: 'Route to Guest AI Agent', ar: 'ØªÙˆØ¬ÙŠÙ‡ Ø¥Ù„Ù‰ ÙˆÙƒÙŠÙ„ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ù„Ø¶ÙŠÙ'}), desc: t({en: 'Launches RAG search flow on SOP.', ar: 'ØªØ´ØºÙŠÙ„ ØªØ¯ÙÙ‚ Ø§Ù„Ø¨Ø­Ø« RAG Ø¹Ù„Ù‰ Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆØ­Ø¯Ø©.'}) },
  ]);

  const handleAddNode = (type: WorkflowNode['type']) => {
    const label = type === 'action'
      ? t({en: 'New Action Module', ar: 'ÙˆØ­Ø¯Ø© Ø¥Ø¬Ø±Ø§Ø¡ Ø¬Ø¯ÙŠØ¯Ø©'})
      : t({en: 'New Decision Condition', ar: 'Ø´Ø±Ø· Ù‚Ø±Ø§Ø± Ø¬Ø¯ÙŠØ¯'});
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      label,
      desc: t({en: 'Configured trigger parameters.', ar: 'Ù…Ø¹Ù„Ù…Ø§Øª Ø§Ù„Ù…Ø´ØºÙ„ Ø§Ù„Ù…ÙƒÙˆÙ†Ø©.'}),
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-primary">{t({en: 'Workflow Builder', ar: 'Ù„ÙˆØ­Ø© Ø£ØªÙ…ØªØ© Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„'})}</h1>
          <p className="text-xs text-primary font-bold">{t({en: 'Design routing for calls, chats, and escalations.', ar: 'ØªØµÙ…ÙŠÙ… Ù…Ù†Ø·Ù‚ Ø§Ù„ØªÙˆØ¬ÙŠÙ‡ Ù„Ù„Ù‡Ø§ØªÙ ÙˆØ§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© ÙˆØ§Ù„ØªØµØ¹ÙŠØ¯.'})}</p>
        </div>
        <div className="flex gap-3">
<Button variant="outline" className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" size="sm" onClick={() => handleAddNode('condition')}>{t({en: '+ Decision', ar: '+ Ù‚Ø±Ø§Ø±'})}</Button>
<Button variant="default" className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" size="sm" onClick={() => handleAddNode('action')}>{t({en: '+ Action', ar: '+ Ø¥Ø¬Ø±Ø§Ø¡'})}</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12 bg-surface rounded-xl border border-primary/10 min-h-[400px]">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <Card className="w-64 p-8 relative border-royal/35 border-2">
              <Badge variant={node.type === 'trigger' ? 'success' : node.type === 'condition' ? 'warning' : 'primary'} className="mb-2">
                {node.type.toUpperCase()}
              </Badge>
              <h4 className="font-bold text-primary text-sm">{node.label}</h4>
              <p className="text-[10px] text-primary">{node.desc}</p>
            </Card>
            {index < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}