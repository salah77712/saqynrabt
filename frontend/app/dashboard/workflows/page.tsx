'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  desc: string;
}

export default function WorkflowsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

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
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">{t({en: 'Workflow Automation Canvas', ar: 'لوحة أتمتة سير العمل'})}</h1>
          <p className="text-xs text-slate-500 font-bold">{t({en: 'Design routing logic for phone, chat, and escalations.', ar: 'تصميم منطق التوجيه للهاتف والمحادثة والتصعيد.'})}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAddNode('condition')}>{t({en: '+ Decision', ar: '+ قرار'})}</Button>
          <Button variant="primary" size="sm" onClick={() => handleAddNode('action')}>{t({en: '+ Action', ar: '+ إجراء'})}</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-12 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 min-h-[400px]">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <Card className="w-64 relative border-royal/35 border-2">
              <Badge variant={node.type === 'trigger' ? 'success' : node.type === 'condition' ? 'warning' : 'primary'} className="mb-2">
                {node.type.toUpperCase()}
              </Badge>
              <h4 className="font-bold text-navy dark:text-white text-sm">{node.label}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{node.desc}</p>
            </Card>
            {index < nodes.length - 1 && (
              <span className="text-2xl text-slate-400 rotate-90 md:rotate-0">➡️</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
