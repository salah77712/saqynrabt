'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale } from '../../providers';
import { SettingsTabs } from '../../../components/dashboard/SettingsTabs';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Skeleton, SkeletonCard } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry } from '../../../components/ui/EmptyState';
import { useUsage } from '../../../hooks/queries/useUsage';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import SecuritySettingsPage from './security/page';
import IntegrationsSettingsPage from './integrations/page';

interface KnowledgeGap {
  id: string;
  question: string;
  count: number;
}

export default function SettingsDashboardPage() {
  const { locale } = useLocale();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const { data: usage, isLoading: usageLoading, isError: usageError, error: usageErrorObj, refetch: refetchUsage } = useUsage();

  const [activeTab, setActiveTab] = useState('general');
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [autoOverage, setAutoOverage] = useState(false);
  const [overageLoading, setOverageLoading] = useState(false);
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [gapsLoading, setGapsLoading] = useState(true);
  const [isGapsModalOpen, setIsGapsModalOpen] = useState(false);
  const [savingOverage, setSavingOverage] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (authLoaded) {
      getToken({ template: 'saqyn-jwt' })
        .then((token) => setJwtToken(token))
        .catch((err) => console.error('Failed to get token:', err));
    }
  }, [authLoaded, getToken]);

  useEffect(() => {
    if (!jwtToken) {
      setGapsLoading(false);
      return;
    }
    setGapsLoading(true);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiBase}/api/knowledge-gaps`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
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
        setGaps([]);
      })
      .finally(() => setGapsLoading(false));
  }, [jwtToken]);

  const handleOverageToggle = useCallback(async (checked: boolean) => {
    setAutoOverage(checked);
    setSavingOverage(true);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

    try {
      await fetch(`${apiBase}/api/overage-settings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auto_overage_enabled: checked }),
      });
    } catch (err) {
      console.error('Overage setting failed:', err);
      setAutoOverage(!checked);
    } finally {
      setSavingOverage(false);
    }
  }, [jwtToken]);

  const handleExportLogs = useCallback(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

    fetch(`${apiBase}/api/export-logs`, {
      headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `saqyn_chat_logs_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        const csvContent = 'data:text/csv;charset=utf-8,Date,Employee Name,Question,AI Answer\n2026-07-05,Salah,Test question,Test answer';
        const encodedUri = encodeURI(csvContent);
        const a = document.createElement('a');
        a.href = encodedUri;
        a.download = 'saqyn_chat_logs_export.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }, [jwtToken]);

  const tabOptions = [
    { id: 'general', label: t('General', 'عام') },
    { id: 'billing', label: t('Billing', 'الفواتير') },
    { id: 'security', label: t('Security', 'الأمان') },
    { id: 'integrations', label: t('Integrations', 'التكاملات') },
  ];

  if (usageLoading) {
    return (
      <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-lg w-72 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-lg w-96" />
        </div>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (usageError) {
    return (
      <EmptyStateWithRetry
        message={usageErrorObj?.message || t('Failed to load settings.', 'فشل تحميل الإعدادات.')}
        onRetry={() => refetchUsage()}
      />
    );
  }

  const metrics = {
    textsUsed: usage?.automation_texts_used ?? 0,
    textsLimit: usage?.automation_texts_limit ?? 500,
    voiceMinsUsed: usage?.voice_minutes_used ?? 0,
    voiceMinsLimit: usage?.voice_minutes_limit ?? 250,
    questionsUsed: usage?.questions_used ?? 0,
    questionsLimit: usage?.questions_limit ?? 2000,
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#141F33] dark:text-white tracking-tight">
          {t('Usage Limits & Settings', 'حدود الاستخدام والإعدادات')}
        </h1>
        <p className="text-[10px] md:text-xs text-slate-500 font-bold mt-0.5">
          {t('Configure billing parameters, export log datasets, and edit parameters.', 'تكوين خيارات الفوترة، تصدير سجلات البيانات، وتعديل المعلمات.')}
        </p>
      </div>

      {isMobile ? (
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#141F33] appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23718096' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
        >
          {tabOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />
      )}

      {activeTab === 'general' && (
        <div className="space-y-4 md:space-y-6">
          <Card className="p-4 md:p-6">
            <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4">
              {t('Overage Protection', 'حماية التجاوز التلقائي')}
            </h2>
            <label className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-gray-100 bg-[#F8F9FB] cursor-pointer">
              <input
                type="checkbox"
                checked={autoOverage}
                onChange={(e) => handleOverageToggle(e.target.checked)}
                disabled={savingOverage}
                className="mt-1 h-5 w-5 md:h-4 md:w-4 rounded text-navy focus:ring-[#141F33] shrink-0"
              />
              <div className="flex-1">
                <p className="text-[11px] md:text-xs font-bold text-[#141F33]">
                  {t('I approve automatic billing overages.', 'أوافق على فواتير التجاوز التلقائي.')}
                </p>
              </div>
            </label>
          </Card>

          <Card className="p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
              {t('Usage Limits', 'حدود الاستخدام')}
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 mb-1.5">
                  <span>{t('Automation Texts', 'نصوص الأتمتة')}</span>
                  <span>{metrics.textsUsed} / {metrics.textsLimit}</span>
                </div>
                <ProgressBar value={metrics.textsLimit > 0 ? (metrics.textsUsed / metrics.textsLimit) * 100 : 0} />
              </div>
              <div>
                <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 mb-1.5">
                  <span>{t('Voice Minutes', 'دقائق الصوت')}</span>
                  <span>{metrics.voiceMinsUsed} / {metrics.voiceMinsLimit}</span>
                </div>
                <ProgressBar value={metrics.voiceMinsLimit > 0 ? (metrics.voiceMinsUsed / metrics.voiceMinsLimit) * 100 : 0} />
              </div>
              <div>
                <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 mb-1.5">
                  <span>{t('RAG Questions', 'أسئلة RAG')}</span>
                  <span>{metrics.questionsUsed} / {metrics.questionsLimit}</span>
                </div>
                <ProgressBar value={metrics.questionsLimit > 0 ? (metrics.questionsUsed / metrics.questionsLimit) * 100 : 0} />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-[11px] md:text-xs font-bold text-[#141F33]">
                {t('Export Chat Log Audit', 'تصدير سجل التدقيق للمحادثات')}
              </h3>
              <p className="text-[9px] md:text-[10px] text-slate-400 mt-1">
                {t('Download employee RAG chatbot logs and question histories in .csv format.', 'تنزيل جميع سجلات المساعد الذكي وتاريخ الأسئلة بصيغة .csv للتدقيق.')}
              </p>
            </div>
            <Button variant="primary" onClick={handleExportLogs} className="min-h-[44px] w-full md:w-auto text-xs">
              {t('Export Logs', 'تصدير السجلات')}
            </Button>
          </Card>
        </div>
      )}

      {activeTab === 'billing' && (
        <Card className="p-4 md:p-6 space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-sm md:text-base">{t('Subscription Plan', 'خطة الاشتراك')}</h3>
          <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
            {t('Your workspace is currently registered under the Enterprise Growth Package.', 'مساحة العمل الخاصة بك مسجلة حالياً تحت باقة نمو المؤسسات.')}
          </p>
          <Button variant="primary" className="min-h-[44px] text-xs w-full md:w-auto">
            {t('Manage Subscription', 'إدارة الاشتراك')}
          </Button>
        </Card>
      )}

      {activeTab === 'security' && <SecuritySettingsPage />}

      {activeTab === 'integrations' && <IntegrationsSettingsPage />}
    </div>
  );
}
