'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import { useLocale, useEntitlements } from '../../providers';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';

interface KnowledgeGap {
  id: string;
  question: string;
  count: number;
}

export default function ChatbotDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [isGapModalOpen, setIsGapModalOpen] = useState(false);

  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' })
        .then((token) => setJwtToken(token))
        .catch((err) => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/knowledge-gaps`, { headers })
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setGaps(data);
        } else if (data && Array.isArray(data.gaps)) {
          setGaps(data.gaps);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch knowledge gaps, showing fallback:', err);
        setGaps([
          { id: '1', question: 'What is our policy for early check-in before 8 AM?', count: 12 },
          { id: '2', question: 'How do we handle guests with service dogs?', count: 8 },
        ]);
      });
  }, [jwtToken]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/chat`,
    headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : { Authorization: 'Bearer mock-token-salah-admin' },
    initialMessages: [
      {
        id: 'welcome-msg',
        role: 'system',
        content: locale === 'ar'
          ? 'مرحباً! أنا مساعد المعرفة الداخلي لشركة SAQYN RABT. اسألني أي سؤال حول الموارد البشرية، أو سياسات التشغيل.'
          : 'Welcome! I am the SAQYN RABT Internal Staff Knowledge Assistant. Ask me anything about HR policies, SOPs, or company guidelines.',
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8 animate-fadeIn">
      {/* Main Chat Interface */}
      <Card className="flex flex-col justify-between h-[500px] overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black text-[#141F33] dark:text-white uppercase">{t('Staff Knowledge Assistant', 'مساعد معرفة الموظفين')}</h2>
            <p className="text-[10px] text-slate-500 font-bold mt-0.5">{t('RAG-powered verified answers only', 'إجابات موثوقة ومستخرجة من المستندات فقط')}</p>
          </div>
          {isLoading && (
            <span className="text-xs text-royal font-bold animate-pulse">{t('Streaming...', 'جاري الكتابة...')}</span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-800/10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#141F33] text-white rounded-br-none dark:bg-royal'
                    : 'bg-white text-slate-800 border border-gray-100 dark:bg-slate-900 dark:text-white dark:border-slate-800 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={t('Ask a question about HR, SOPs, or guidelines...', 'اسأل سؤالاً عن الموارد البشرية، إجراءات التشغيل...')}
            />
            <Button type="submit" disabled={isLoading || !input}>
              {t('Send', 'إرسال')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Right Column: Knowledge Gap Panel */}
      <Card className="flex flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="pb-3 border-b border-gray-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-[#141F33] dark:text-white uppercase tracking-wide">
              {t('Staff Knowledge Gaps', 'فجوات معرفة الموظفين')}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold mt-1">
              {t('Unanswered queries that staff asked. Update SOPs to cover them.', 'استفسارات الموظفين غير المجابة. يرجى تحديث الإجراءات لتغطيتها.')}
            </p>
          </div>

          <div className="space-y-3">
            {gaps.map((gap) => (
              <div
                key={gap.id}
                onClick={() => {
                  setSelectedGap(gap.question);
                  setIsGapModalOpen(true);
                }}
                className="bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 rounded-xl p-3.5 hover:border-royal transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-normal">
                  &quot;{gap.question}&quot;
                </p>
                <Badge variant="warning">{gap.count}x</Badge>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6" onClick={() => setIsGapModalOpen(true)}>
          {t('Review Gaps', 'مراجعة الفجوات')}
        </Button>
      </Card>

      <Modal isOpen={isGapModalOpen} onClose={() => setIsGapModalOpen(false)} title="Resolve Knowledge Gap">
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          {t(
            'The following query was not answered by the current indexed documents. Upload a PDF containing the correct policy details to fix this.',
            'تم طرح هذا السؤال من قبل الموظفين ولكن تعذر الإجابة عليه بناءً على المستندات الحالية. لحل هذا، قم بتحميل مستند PDF يحتوي على السياسة.'
          )}
        </p>
        <div className="bg-[#F8F9FB] border border-gray-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-bold text-slate-700">
            &quot;{selectedGap || gaps[0]?.question || 'No question selected'}&quot;
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" className="flex-1" onClick={() => setIsGapModalOpen(false)}>
            Upload Fix PDF
          </Button>
          <Button variant="outline" onClick={() => setIsGapModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
