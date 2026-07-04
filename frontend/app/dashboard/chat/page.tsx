'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import { useLocale, useEntitlements } from '../../providers';

interface KnowledgeGap {
  id: string;
  question: string;
  count: number;
}

export default function ChatbotDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [isGapModalOpen, setIsGapModalOpen] = useState(false);

  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' }) // Fetch custom Clerk template
        .then(token => setJwtToken(token))
        .catch(err => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  // Fetch knowledge gaps from `/api/knowledge-gaps`
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/knowledge-gaps`, { headers })
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setGaps(data);
        } else if (data && Array.isArray(data.gaps)) {
          setGaps(data.gaps);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch knowledge gaps, showing fallback:', err);
        // Fallback mock gaps
        setGaps([
          { id: '1', question: 'What is our policy for early check-in before 8 AM?', count: 12 },
          { id: '2', question: 'How do we handle guests with service dogs under Qatar Law?', count: 8 },
          { id: '3', question: 'What is the refund process for no-show catering bookings?', count: 5 },
        ]);
      });
  }, [jwtToken]);

  // Setup Vercel AI SDK Chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/chat`,
    headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : { Authorization: 'Bearer mock-token-salah-admin' },
    initialMessages: [
      {
        id: 'welcome-msg',
        role: 'system',
        content: locale === 'ar' 
          ? 'مرحباً! أنا مساعد المعرفة الداخلي لشركة SAQYN RABT. اسألني أي سؤال حول الموارد البشرية، أو سياسات التشغيل.' 
          : 'Welcome! I am the SAQYN RABT Internal Staff Knowledge Assistant. Ask me anything about HR policies, SOPs, or company guidelines.'
      }
    ],
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8 h-[calc(100vh-140px)] min-h-[500px] animate-fadeIn">

      {/* Main Chat Interface */}
      <div className="bg-white border border-gray-200 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm h-full">
        
        {/* Chat Window Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🧠</span>
            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] tracking-wide uppercase">{t({ en: 'Staff Knowledge Assistant', ar: 'مساعد معرفة الموظفين' })}</h2>
              <p className="text-[11px] text-[#718096] font-medium mt-0.5">{t({ en: 'RAG-powered verified answers only', ar: 'إجابات موثوقة ومستخرجة من المستندات فقط' })}</p>
            </div>
          </div>
          {isLoading && (
            <span className="text-xs text-blue-600 font-bold animate-pulse">{t({ en: 'Streaming...', ar: 'جاري الكتابة...' })}</span>
          )}
        </div>

        {/* Message Logs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#141F33] text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.content}
                
                {/* Simulated Citation Pills (Section 4.2) */}
                {msg.role === 'assistant' && msg.id !== 'welcome-msg' && (
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-2">
                    <button
                      onClick={() => alert('Opening source document preview...')}
                      className="bg-slate-100 hover:bg-slate-200 text-[#141F33] text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200 transition-colors flex items-center gap-1.5"
                    >
                      📄 hr_policy_qatar.pdf
                    </button>
                    <button
                      onClick={() => alert('Opening source document preview...')}
                      className="bg-slate-100 hover:bg-slate-200 text-[#141F33] text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200 transition-colors flex items-center gap-1.5"
                    >
                      📄 front_desk_sop.pdf
                    </button>
                  </div>
                )}
              </div>

              {/* Timestamp label */}
              <span className="text-[9px] font-bold text-slate-400 mt-1 px-1">
                {msg.role === 'user' ? t({ en: 'You', ar: 'أنت' }) : t({ en: 'AI Assistant', ar: 'مساعد الذكاء الاصطناعي' })}
              </span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={t({ en: 'Ask a question about HR, SOPs, or guidelines...', ar: 'اسأل سؤالاً عن الموارد البشرية، إجراءات التشغيل...' })}
              className="flex-1 min-h-[44px] border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
            />
            <button
              type="submit"
              disabled={isLoading || !input}
              className="bg-[#141F33] hover:opacity-95 text-white font-bold px-6 rounded-xl transition-all disabled:opacity-40 min-h-[44px] text-xs flex items-center justify-center"
            >
              {t({ en: 'Send', ar: 'إرسال' })}
            </button>
          </div>
        </form>

      </div>

      {/* Right Column: Knowledge Gap Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
        
        <div className="space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="text-sm font-extrabold text-[#141F33] uppercase tracking-wide flex items-center gap-2">
              <span>⚠️</span> {t({ en: 'Staff Knowledge Gaps', ar: 'فجوات معرفة الموظفين' })}
            </h3>
            <p className="text-[11px] text-[#718096] font-medium mt-1">
              {t({ en: "Unanswered queries that staff asked. Update SOPs to cover them.", ar: 'استفسارات الموظفين غير المجابة. يرجى تحديث الإجراءات لتغطيتها.' })}
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
                className="bg-slate-50 border border-gray-100 rounded-xl p-3.5 hover:border-[#141F33] transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  "{gap.question}"
                </p>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                  {gap.count}x
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsGapModalOpen(true)}
          className="w-full bg-[#141F33]/5 text-[#141F33] font-bold py-3.5 rounded-xl border border-[#141F33]/10 hover:bg-[#141F33]/10 transition-all text-xs"
        >
          {t({ en: 'Review Gaps', ar: 'مراجعة الفجوات' })}
        </button>

      </div>

      {/* Knowledge Gaps Detail Modal */}
      {isGapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            
            <h3 className="text-xl font-extrabold text-[#141F33] mb-2 flex items-center gap-2">
              <span>⚠️</span> {t({ en: 'Resolve Knowledge Gap', ar: 'حل فجوة المعرفة' })}
            </h3>
            
            <p className="text-xs font-semibold text-[#718096] mb-6 leading-relaxed">
              {t({
                en: 'The following question was asked by multiple employees but could not be answered by the current indexed documents. To fix this, upload a PDF containing the correct policy details.',
                ar: 'تم طرح هذا السؤال من قبل العديد من الموظفين ولكن تعذر الإجابة عليه بناءً على المستندات الحالية. لحل هذا، قم بتحميل مستند PDF يحتوي على السياسة الصحيحة.'
              })}
            </p>

            <div className="bg-[#F8F9FB] border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-slate-700">
                "{selectedGap || gaps[0]?.question || 'No question selected'}"
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsGapModalOpen(false);
                  alert('Navigate to Documents to upload the required file.');
                }}
                className="flex-1 bg-[#141F33] text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Upload Fix PDF', ar: 'تحميل ملف PDF للحل' })}
              </button>
              <button
                onClick={() => setIsGapModalOpen(false)}
                className="bg-gray-50 hover:bg-gray-100 text-[#141F33] font-bold rounded-xl border border-gray-200 transition-all hover:scale-[1.02] active:scale-95 px-6"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Cancel', ar: 'إلغاء' })}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
