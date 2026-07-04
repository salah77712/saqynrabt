'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../../providers';
import { SettingsTabs } from '../../../components/dashboard/SettingsTabs';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import SecuritySettingsPage from './security/page';
import IntegrationsSettingsPage from './integrations/page';

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
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const [activeTab, setActiveTab] = useState('general');
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
  const [savingOverage, setSavingOverage] = useState(false);

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

    const fetchMetrics = fetch(`${apiBase}/api/usage-stats`, { headers }).then((res) => res.json());
    const fetchEntitlements = fetch(`${apiBase}/api/entitlements`, { headers }).then((res) => res.json());
    const fetchGaps = fetch(`${apiBase}/api/knowledge-gaps`, { headers }).then((res) => res.json());

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
      .catch((err) => {
        console.warn('Failed to load settings, displaying mocks:', err);
        setGaps([
          { id: '1', question: 'What is our policy for early check-in?', count: 12 },
          { id: '2', question: 'How do we handle service dogs?', count: 8 },
        ]);
      });
  }, [jwtToken]);

  const handleOverageToggle = (checked: boolean) => {
    setAutoOverage(checked);
    setSavingOverage(true);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/overage-settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ auto_overage_enabled: checked }),
    })
      .then((res) => res.json())
      .catch((err) => console.error('Overage setting failed:', err))
      .finally(() => setSavingOverage(false));
  };

  const handleExportLogs = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/export-logs`, { headers })
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
        const csvContent = 'data:text/csv;charset=utf-8,Date,Employee Name,Question,AI Answer\n2026-07-04,Sara,What is the rollover policy?,Max 5 days.';
        const encodedUri = encodeURI(csvContent);
        const a = document.createElement('a');
        a.href = encodedUri;
        a.download = 'saqyn_chat_logs_mock.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#141F33] dark:text-white tracking-tight">
          {t('Usage Limits & Settings', 'حدود الاستخدام والإعدادات')}
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-0.5">
          {t('Configure billing parameters, export log datasets, and edit parameters.', 'تكوين خيارات الفوترة، تصدير سجلات البيانات، وتعديل معلمات مساحة العمل.')}
        </p>
      </div>

      <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'general' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              {t('Overage Protection', 'حماية التجاوز التلقائي')}
            </h2>
            <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-[#F8F9FB] cursor-pointer">
              <input
                type="checkbox"
                checked={autoOverage}
                onChange={(e) => handleOverageToggle(e.target.checked)}
                disabled={savingOverage}
                className="mt-1 h-4 w-4 rounded text-navy focus:ring-[#141F33]"
              />
              <div className="flex-1">
                <p className="text-xs font-bold text-[#141F33]">
                  {t('I approve automatic billing overages.', 'أوافق على فواتير التجاوز التلقائي.')}
                </p>
              </div>
            </label>
          </Card>

          <Card className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xs font-bold text-[#141F33]">
                {t('Export Chat Log Audit', 'تصدير سجل التدقيق للمحادثات')}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">
                {t('Download employee RAG chatbot logs and question histories in .csv format.', 'تنزيل جميع سجلات المساعد الذكي وتاريخ الأسئلة بصيغة .csv للتدقيق.')}
              </p>
            </div>
            <Button variant="primary" onClick={handleExportLogs}>
              Export Logs
            </Button>
          </Card>
        </div>
      )}

      {activeTab === 'billing' && (
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-base">Subscription Plan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your workspace is currently registered under the **Enterprise Growth Package**.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Manage Subscription</Button>
          </div>
        </Card>
      )}

      {activeTab === 'security' && <SecuritySettingsPage />}

      {activeTab === 'integrations' && <IntegrationsSettingsPage />}
    </div>
  );
}
