'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../../providers';

interface UsageMetrics {
  textsUsed: number;
  textsLimit: number;
  voiceMinsUsed: number;
  voiceMinsLimit: number;
  questionsUsed: number;
  questionsLimit: number;
}

interface KnowledgeGap {
  id: string;
  question: string;
  count: number;
}

export default function SettingsDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<UsageMetrics>({
    textsUsed: 142,
    textsLimit: 500,
    voiceMinsUsed: 87,
    voiceMinsLimit: 250,
    questionsUsed: 1204,
    questionsLimit: 2000,
  });

  const [autoOverage, setAutoOverage] = useState(false);
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [isGapsModalOpen, setIsGapsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingOverage, setSavingOverage] = useState(false);

  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' })
        .then(token => setJwtToken(token))
        .catch(err => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  // Fetch usage metrics, overage setting, and knowledge gaps
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    setLoading(true);

    const fetchMetrics = fetch(`${apiBase}/api/usage-stats`, { headers }).then(res => res.json());
    const fetchEntitlements = fetch(`${apiBase}/api/entitlements`, { headers }).then(res => res.json());
    const fetchGaps = fetch(`${apiBase}/api/knowledge-gaps`, { headers }).then(res => res.json());

    Promise.all([fetchMetrics, fetchEntitlements, fetchGaps])
      .then(([metricsData, entData, gapsData]) => {
        if (metricsData && metricsData.usage) {
          setMetrics({
            textsUsed: metricsData.usage.automation_texts_used ?? 142,
            textsLimit: entData?.automation_texts_limit ?? 500,
            voiceMinsUsed: metricsData.usage.voice_minutes_used ?? 87,
            voiceMinsLimit: entData?.voice_minutes_limit ?? 250,
            questionsUsed: metricsData.usage.questions_used ?? 1204,
            questionsLimit: entData?.max_questions ?? 2000,
          });
        }
        if (entData) {
          setAutoOverage(entData.auto_overage_enabled ?? false);
        }
        if (Array.isArray(gapsData)) {
          setGaps(gapsData);
        } else if (gapsData && Array.isArray(gapsData.gaps)) {
          setGaps(gapsData.gaps);
        }
      })
      .catch(err => {
        console.warn('Failed to load metrics, displaying mocks:', err);
        // Fallback mock details
        setGaps([
          { id: '1', question: 'What is our policy for early check-in before 8 AM?', count: 12 },
          { id: '2', question: 'How do we handle guests with service dogs under Qatar Law?', count: 8 },
          { id: '3', question: 'What is the refund process for no-show catering bookings?', count: 5 },
        ]);
      })
      .finally(() => setLoading(false));
  }, [jwtToken]);

  // Toggle Overage Setting Handler
  const handleOverageToggle = (checked: boolean) => {
    setAutoOverage(checked);
    setSavingOverage(true);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/overage-settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ auto_overage_enabled: checked })
    })
      .then(res => res.json())
      .catch(err => {
        console.error('Overage settings toggle failed:', err);
      })
      .finally(() => setSavingOverage(false));
  };

  // Export Chat Logs Handler (CSV download)
  const handleExportLogs = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/export-logs`, { headers })
      .then(res => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `saqyn_chat_logs_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('Export failed, generating simulated CSV download:', err);
        // Simulated local CSV file download
        const csvContent = "data:text/csv;charset=utf-8,Date,Employee Name,Question,AI Answer\n2026-07-04,Sara Al-Mansoori,What is the rollover vacation policy?,Vacation days roll over up to 5 days max.";
        const encodedUri = encodeURI(csvContent);
        const a = document.createElement('a');
        a.href = encodedUri;
        a.download = "saqyn_chat_logs_mock.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  // Helper to color-code progress bars based on percentage
  const getProgressBarColor = (used: number, limit: number) => {
    const pct = (used / limit) * 100;
    if (pct >= 90) return 'bg-red-500';
    if (pct >= 70) return 'bg-amber-500';
    return 'bg-[#2A5CFF]';
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#141F33] tracking-tight">
          {t({ en: 'Usage Limits & Settings', ar: 'حدود الاستخدام والإعدادات' })}
        </h1>
        <p className="text-sm font-semibold text-[#718096] mt-0.5">
          {t({ en: 'Configure auto-overages, download operations log, and check workspace limits.', ar: 'تكوين خيارات التجاوز التلقائي، تنزيل سجل العمليات، والتحقق من حدود مساحة العمل.' })}
        </p>
      </div>

      {/* 1. Usage & Limits Progress Bars */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-extrabold text-[#718096] uppercase tracking-widest mb-6">{t({ en: 'Current Usage Metrics', ar: 'مقاييس الاستخدام الحالية' })}</h2>
        
        <div className="space-y-6">
          {/* Progress Bar 1: Texts */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#141F33] mb-1.5">
              <span>{t({ en: 'Automation Text API Requests', ar: 'طلبات أتمتة النصوص' })}</span>
              <span>{metrics.textsUsed} / {metrics.textsLimit}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(metrics.textsUsed, metrics.textsLimit)}`}
                style={{ width: `${Math.min((metrics.textsUsed / metrics.textsLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Progress Bar 2: Voice */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#141F33] mb-1.5">
              <span>{t({ en: 'Voice Dispatch Minutes', ar: 'دقائق توزيع المكالمات الصوتية' })}</span>
              <span>{metrics.voiceMinsUsed} / {metrics.voiceMinsLimit} {t({ en: 'mins', ar: 'دقيقة' })}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(metrics.voiceMinsUsed, metrics.voiceMinsLimit)}`}
                style={{ width: `${Math.min((metrics.voiceMinsUsed / metrics.voiceMinsLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Progress Bar 3: Questions */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#141F33] mb-1.5">
              <span>{t({ en: 'Internal Chatbot RAG Questions', ar: 'أسئلة المساعد الذكي الداخلي' })}</span>
              <span>{metrics.questionsUsed} / {metrics.questionsLimit}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(metrics.questionsUsed, metrics.questionsLimit)}`}
                style={{ width: `${Math.min((metrics.questionsUsed / metrics.questionsLimit) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Auto-Overage Checkbox */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-extrabold text-[#718096] uppercase tracking-widest mb-4">{t({ en: 'Billing Configuration', ar: 'تكوين الفوترة' })}</h2>
        
        <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-[#F8F9FB] cursor-pointer hover:border-[#141F33] transition-colors">
          <input
            type="checkbox"
            checked={autoOverage}
            onChange={(e) => handleOverageToggle(e.target.checked)}
            disabled={savingOverage}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#141F33] focus:ring-[#141F33]"
          />
          <div className="flex-1">
            <p className="text-xs font-bold text-[#141F33]">{t({ en: 'I approve automatic billing overages.', ar: 'أوافق على فواتير التجاوز التلقائي.' })}</p>
            <p className="text-[10px] text-[#718096] font-medium mt-1 leading-relaxed">
              {t({
                en: 'By checking this, our system will allow usage (Voice & Texts) to extend beyond plan limits, billed at a metered tier rate. When unchecked, operations pause at 100% capacity.',
                ar: 'عند تحديد هذا الخيار، سيسمح النظام بتجاوز حدود الباقة (الصوت والنصوص) بسعر الاستهلاك المباشر. عند إلغاء التحديد، تتوقف العمليات فوراً عند الوصول للحد الأقصى.'
              })}
            </p>
          </div>
        </label>
      </div>

      {/* 3. Operational Log Exporter & Gaps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-extrabold text-[#718096] uppercase tracking-widest mb-4">{t({ en: 'Workspace Actions', ar: 'إجراءات مساحة العمل' })}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Export Chat Logs */}
          <div className="p-4 rounded-xl border border-gray-100 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-[#141F33]">{t({ en: 'Export Chat Log Audit', ar: 'تصدير سجل التدقيق للمحادثات' })}</h3>
              <p className="text-[10px] text-[#718096] font-medium mt-1 leading-normal">
                {t({ en: 'Download all employee RAG chatbot logs and question histories in .csv format for auditing.', ar: 'تنزيل جميع سجلات المساعد الذكي وتاريخ الأسئلة بصيغة .csv للتدقيق.' })}
              </p>
            </div>
            <button
              onClick={handleExportLogs}
              className="bg-[#141F33] hover:opacity-95 text-white font-bold py-3 px-4 rounded-xl text-xs min-h-[44px] transition-all"
            >
              {t({ en: 'Export Chat Logs to CSV', ar: 'تصدير سجل المحادثات كـ CSV' })}
            </button>
          </div>

          {/* Review Unanswered Questions */}
          <div className="p-4 rounded-xl border border-gray-100 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-[#141F33]">{t({ en: 'Review Unanswered Gaps', ar: 'مراجعة الأسئلة غير المجابة' })}</h3>
              <p className="text-[10px] text-[#718096] font-medium mt-1 leading-normal">
                {t({ en: 'Review questions that staff members asked but could not be answered with the current indexed files.', ar: 'مراجعة الأسئلة التي طرحها الموظفون ولم يتمكن المساعد من إجابتها.' })}
              </p>
            </div>
            <button
              onClick={() => setIsGapsModalOpen(true)}
              className="bg-[#141F33]/5 text-[#141F33] font-bold py-3 px-4 rounded-xl border border-[#141F33]/10 hover:bg-[#141F33]/10 transition-all text-xs min-h-[44px]"
            >
              {t({ en: 'Review Unanswered Questions', ar: 'مراجعة الأسئلة غير المجابة' })}
            </button>
          </div>

        </div>
      </div>

      {/* Unanswered Gaps Modal */}
      {isGapsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            
            <h3 className="text-xl font-extrabold text-[#141F33] mb-2 flex items-center gap-2">
              <span>⚠️</span> {t({ en: 'Unanswered Questions Logs', ar: 'سجل الأسئلة غير المجابة' })}
            </h3>
            
            <p className="text-xs font-semibold text-[#718096] mb-6 leading-relaxed">
              {t({
                en: 'These are the questions asked by employees that had low confidence scores or failed retrieval checks. Resolve these by uploading a reference document.',
                ar: 'هذه الأسئلة التي طرحها الموظفون وحصلت على درجات ثقة منخفضة. يمكنك حلها بتحميل مستند مرجعي مناسب.'
              })}
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-2">
              {gaps.map((gap) => (
                <div key={gap.id} className="flex justify-between items-center gap-4 bg-slate-50 border border-gray-100 p-3 rounded-xl">
                  <span className="text-xs font-bold text-slate-700">"{gap.question}"</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                    {gap.count}x
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsGapsModalOpen(false);
                  window.location.href = '/dashboard/documents';
                }}
                className="flex-1 bg-[#141F33] text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Go to Documents Hub', ar: 'الانتقال لمركز المستندات' })}
              </button>
              <button
                onClick={() => setIsGapsModalOpen(false)}
                className="bg-gray-50 hover:bg-gray-100 text-[#141F33] font-bold rounded-xl border border-gray-200 transition-all hover:scale-[1.02] active:scale-95 px-6"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Close', ar: 'إغلاق' })}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
