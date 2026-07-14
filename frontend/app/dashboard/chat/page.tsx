'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ClipboardList } from 'lucide-react';
import { useChat } from 'ai/react';
import { useLocale } from '../../providers';
import { Button } from '@/components/shadcn/button';
import { Card } from '@/components/shadcn/card';
import { Input } from '../../../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton, SkeletonCard } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry } from '../../../components/ui/EmptyState';
import { useChatHistory } from '../../../hooks/queries/useChatHistory';
import { PullToRefresh } from '../../../components/PullToRefresh';
import { useGlobalToast } from '../../../lib/toast';

interface KnowledgeGap {
  id: string;
  question: string;
  count: number;
}

export default function ChatbotDashboardPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [gapsLoading, setGapsLoading] = useState(true);
  const [gapsError, setGapsError] = useState(false);
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [isGapModalOpen, setIsGapModalOpen] = useState(false);
  const [showGapsSheet, setShowGapsSheet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatHistory, isLoading: historyLoading } = useChatHistory();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setGapsLoading(true);
    setGapsError(false);
    fetch('/api/knowledge-gaps')
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setGaps(data);
        } else if (data && Array.isArray(data.gaps)) {
          setGaps(data.gaps);
        } else {
          setGaps([]);
        }
      })
      .catch(() => {
        setGapsError(true);
        setGaps([]);
      })
      .finally(() => setGapsLoading(false));
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleRefresh = useCallback(async () => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 800);
    });
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast(t('Copied to clipboard', 'تم النسخ إلى الحافظة'), 'success');
    });
  }, [t]);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTouchStart = useCallback((text: string) => {
    longPressTimer.current = setTimeout(() => {
      copyToClipboard(text);
    }, 500);
  }, [copyToClipboard]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  if (historyLoading) {
    return (
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-4 md:gap-8">
          <SkeletonCard />
          <div className="hidden xl:block">
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-4 md:gap-8">
          <Card className="flex flex-col overflow-hidden p-0"
            style={{ height: 'calc(100vh - 280px)', minHeight: '400px', maxHeight: '700px' }}>
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-xs md:text-sm font-black text-[#141F33] uppercase truncate">
                  {t('Staff Knowledge Assistant', 'مساعد معرفة الموظفين')}
                </h2>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-bold mt-0.5 truncate">
                  {t('Answers from your documents only', 'إجابات موثوقة ومستخرجة من المستندات فقط')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isLoading && (
                  <span className="inline-flex items-center gap-1 text-royal">
                    {[0, 160, 320].map((delay) => (
                      <span
                        key={delay}
                        className="inline-block w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                )}
                <button
                  onClick={() => setShowGapsSheet(true)}
                  aria-label={t('Show knowledge gaps', 'عرض فجوات المعرفة')}
                  className="xl:hidden w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95 min-h-[44px] min-w-[44px]"
                >
                  <ClipboardList className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50"
              style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.filter((m) => m.role !== 'system').map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                  style={{ maxWidth: '85%' }}
                  onTouchStart={() => handleTouchStart(msg.content)}
                  onTouchEnd={handleTouchEnd}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    copyToClipboard(msg.content);
                  }}
                >
                  <div
                    className={`p-3 md:p-4 rounded-2xl text-[11px] md:text-xs font-semibold leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#141F33] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-gray-100 bg-white shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={t('Ask a question...', 'اسأل سؤالاً...')}
                  className="min-h-[44px] text-xs md:text-sm"
                />
                <Button type="submit" disabled={isLoading || !input} className="min-h-[44px] min-w-[44px] whitespace-nowrap text-xs md:text-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95">
                  {t('Send', 'إرسال')}
                </Button>
              </div>
            </form>
          </Card>

          <Card className="hidden xl:flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-100">
                <h3 className="text-sm font-black text-[#141F33] uppercase tracking-wide">
                  {t('Unanswered Questions', 'فجوات معرفة الموظفين')}
                </h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1">
                  {t('Questions your team asked that the AI couldn\'t answer. Upload docs to fill the gaps.', 'استفسارات الموظفين غير المجابة. يرجى تحديث الإجراءات لتغطيتها.')}
                </p>
              </div>

              {gapsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rectangular" className="h-16 w-full" />
                  ))}
                </div>
              ) : gapsError ? (
                <p className="text-xs text-slate-400">
                  {t('Could not load knowledge gaps.', 'تعذر تحميل فجوات المعرفة.')}
                </p>
              ) : gaps.length === 0 ? (
                <p className="text-xs text-slate-400">
                  {t('No knowledge gaps detected yet. Ask questions to identify gaps.', 'لم يتم اكتشاف أي فجوات معرفية بعد. اطرح أسئلة لتحديد الفجوات.')}
                </p>
              ) : (
                <div className="space-y-3">
                  {gaps.map((gap) => (
                    <div
                      key={gap.id}
                      onClick={() => {
                        setSelectedGap(gap.question);
                        setIsGapModalOpen(true);
                      }}
                      className="bg-slate-50 border border-gray-100 rounded-xl p-3.5 hover:border-royal transition-all cursor-pointer flex items-start justify-between gap-3"
                    >
                      <p className="text-xs font-bold text-slate-700 leading-normal">
                        &ldquo;{gap.question}&rdquo;
                      </p>
                      <Badge variant="warning">{gap.count}x</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button variant="outline" className="w-full mt-6 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95" onClick={() => setIsGapModalOpen(true)}>
              {t('Review Gaps', 'مراجعة الفجوات')}
            </Button>
          </Card>
        </div>

        {showGapsSheet && (
          <div className="fixed inset-0 z-50 flex items-end xl:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowGapsSheet(false)} />
            <div className="relative w-full bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto animate-slide-up p-5"
              style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-[#141F33] uppercase tracking-wide">
                  {t('Knowledge Gaps', 'فجوات المعرفة')}
                </h3>
                <button
                  onClick={() => setShowGapsSheet(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95 min-h-[44px] min-w-[44px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {gapsLoading ? (
                  <Skeleton variant="rectangular" className="h-32 w-full" />
                ) : gaps.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    {t('No gaps detected.', 'لم يتم اكتشاف أي فجوات.')}
                  </p>
                ) : (
                  gaps.map((gap) => (
                    <div
                      key={gap.id}
                      onClick={() => {
                        setSelectedGap(gap.question);
                        setIsGapModalOpen(true);
                      }}
                      className="bg-slate-50 border border-gray-100 rounded-xl p-3.5 flex items-start justify-between gap-3"
                    >
                      <p className="text-xs font-bold text-slate-700 leading-normal">
                        &ldquo;{gap.question}&rdquo;
                      </p>
                      <Badge variant="warning">{gap.count}x</Badge>
                    </div>
                  ))
                )}
              </div>
              <Button variant="outline" className="w-full mt-4 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95" onClick={() => setIsGapModalOpen(true)}>
                {t('Review All Gaps', 'مراجعة جميع الفجوات')}
              </Button>
            </div>
          </div>
        )}

        <Dialog open={isGapModalOpen} onOpenChange={(open) => !open && setIsGapModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resolve Knowledge Gap</DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t(
                'The following query was not answered by the current indexed documents. Upload a PDF containing the correct policy details to fix this.',
                'تم طرح هذا السؤال من قبل الموظفين ولكن تعذر الإجابة عليه بناءً على المستندات الحالية.'
              )}
            </p>
            <div className="bg-[#F8F9FB] border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-slate-700">
                &ldquo;{selectedGap || (gaps.length > 0 ? gaps[0].question : t('No question selected', 'لم يتم تحديد سؤال'))}&rdquo;
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" className="flex-1 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95" onClick={() => setIsGapModalOpen(false)}>
                Upload Document
              </Button>
              <Button variant="outline" className="min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95" onClick={() => setIsGapModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PullToRefresh>
  );
}
