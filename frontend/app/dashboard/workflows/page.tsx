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
    { id: '1', type: 'trigger', label: t({en: 'Incoming Guest Phone Call', ar: 'مكالمة هاتفية واردة من ضيف'}), desc: t({en: 'Fires when Vapi webhook detects call.', ar: 'يتم تشغيله عند اكتشاف webhook Vapi للمكالمة.'}) },
    { id: '2', type: 'condition', label: t({en: 'Outside Business Hours?', ar: 'خارج ساعات العمل؟'}), desc: t({en: 'Checks if time is between 6 PM and 8 AM.', ar: 'يتحقق مما إذا كان الوقت بين 6 مساءً و 8 صباحاً.'}) },
    { id: '3', type: 'action', label: t({en: 'Route to Guest AI Agent', ar: 'توجيه إلى وكيل الذكاء الاصطناعي للضيف'}), desc: t({en: 'Launches RAG search flow on SOP.', ar: 'تشغيل تدفق البحث RAG على إجراءات التشغيل الموحدة.'}) },
  ]);

  const handleAddNode = (type: WorkflowNode['type']) => {
    const label = type === 'action'
      ? t({en: 'New Action Module', ar: 'وحدة إجراء جديدة'})
      : t({en: 'New Decision Condition', ar: 'شرط قرار جديد'});
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      label,
      desc: t({en: 'Configured trigger parameters.', ar: 'معلمات المشغل المكونة.'}),
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33]">{t({en: 'Workflow Builder', ar: 'لوحة أتمتة سير العمل'})}</h1>
          <p className="text-xs text-[#141F33] font-bold">{t({en: 'Design routing for calls, chats, and escalations.', ar: 'تصميم منطق التوجيه للهاتف والمحادثة والتصعيد.'})}</p>
        </div>
        <div className="flex gap-3">
<Button variant="outline" className="py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px]" size="sm" onClick={() => handleAddNode('condition')}>{t({en: '+ Decision', ar: '+ قرار'})}</Button>
<Button variant="default" className="py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px]" size="sm" onClick={() => handleAddNode('action')}>{t({en: '+ Action', ar: '+ إجراء'})}</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12 bg-[#F8F9FB] rounded-[40px] border border-[#141F33]/10 min-h-[400px]">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <Card className="w-64 p-8 relative border-royal/35 border-2">
              <Badge variant={node.type === 'trigger' ? 'success' : node.type === 'condition' ? 'warning' : 'primary'} className="mb-2">
                {node.type.toUpperCase()}
              </Badge>
              <h4 className="font-bold text-[#141F33] text-sm">{node.label}</h4>
              <p className="text-[10px] text-[#141F33]">{node.desc}</p>
            </Card>
            {index < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 text-[#141F33] rotate-90 md:rotate-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}