'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useEntitlements } from '../providers';
import { OverviewMetrics } from '../../components/dashboard/OverviewMetrics';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { UsageCard } from '../../components/dashboard/UsageCard';

interface UsageMetrics {
  textsUsed: number;
  textsLimit: number;
  voiceMinsUsed: number;
  voiceMinsLimit: number;
  questionsUsed: number;
  questionsLimit: number;
  employeesUsed: number;
  employeesLimit: number;
}

export default function DashboardOverviewPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const [metrics, setMetrics] = useState<UsageMetrics>({
    textsUsed: 142,
    textsLimit: 500,
    voiceMinsUsed: 87,
    voiceMinsLimit: 250,
    questionsUsed: 1204,
    questionsLimit: 2000,
    employeesUsed: 23,
    employeesLimit: 50,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mockMode) {
      setLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      fetch(`${apiBase}/api/usage-stats`, {
        headers: {
          'Authorization': 'Bearer mock-token-salah-admin',
        },
      })
        .then((res) => res.json())
        .then((data: any) => {
          if (data && data.usage) {
            setMetrics({
              textsUsed: data.usage.automation_texts_used ?? 142,
              textsLimit: data.entitlements?.automation_texts_limit ?? 500,
              voiceMinsUsed: data.usage.voice_minutes_used ?? 87,
              voiceMinsLimit: data.entitlements?.voice_minutes_limit ?? 250,
              questionsUsed: data.usage.questions_used ?? 1204,
              questionsLimit: data.entitlements?.max_questions ?? 2000,
              employeesUsed: data.employeeCount ?? 23,
              employeesLimit: data.entitlements?.max_employees ?? 50,
            });
          }
        })
        .catch((err) => console.error('Failed to fetch usage stats:', err))
        .finally(() => setLoading(false));
    }
  }, [mockMode]);

  const metricCards = [
    { label: t('Questions Answered Today', 'الأسئلة المجابة اليوم'), value: metrics.questionsUsed, change: '↑ 12% today', isPositive: true },
    { label: t('Pending Automations', 'الأتمتة المعلقة'), value: 3, change: 'All clear soon', isPositive: true },
    { label: t('Active Employees', 'الموظفون النشطون'), value: metrics.employeesUsed, change: '0 churn cases', isPositive: true },
    { label: t('Quota Consumption', 'استهلاك الكوتا'), value: `${Math.round((metrics.questionsUsed / metrics.questionsLimit) * 100)}%`, change: 'Optimal load', isPositive: true },
  ];

  const quickActions = [
    { href: '/dashboard/chat', label: t('New Chat', 'محادثة جديدة'), icon: '💬' },
    { href: '/dashboard/documents', label: t('Upload PDF', 'تحميل ملف PDF'), icon: '📄' },
    { href: '/dashboard/team', label: t('Manage Team', 'إدارة الفريق'), icon: '👥' },
    { href: '/dashboard/reports', label: t('View Reports', 'عرض التقارير'), icon: '📊' },
  ];

  const recentEvents = [
    { id: '1', type: 'automation' as const, title: t('Customer requested repair quote', 'طلب العميل تقدير إصلاح'), time: '2m ago' },
    { id: '2', type: 'chat' as const, title: t('Sara Al-Mansoori verified HR policy', 'تحققت سارة المنصوري من سياسة الموارد البشرية'), time: '14m ago' },
    { id: '3', type: 'approval' as const, title: t('Fahad Rashid requested access approval', 'طلب فهد رشيد الموافقة على الدخول'), time: '1h ago' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#141F33] dark:text-white tracking-tight">
          {t('Good morning, Salah', 'صباح الخير، صلاح')}
        </h1>
        <p className="text-sm font-semibold text-[#718096] mt-1">
          {t("Here's your business operations summary for today.", 'إليك ملخص عمليات عملك اليوم.')}
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <OverviewMetrics metrics={metricCards} />

      {/* Quick Action Pills */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          {t('Quick Actions', 'إجراءات سريعة')}
        </h3>
        <QuickActions actions={quickActions} />
      </div>

      {/* Usage Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageCard
          title={t('Customer Automation', 'أتمتة العملاء')}
          icon="📞"
          used={metrics.voiceMinsUsed}
          limit={metrics.voiceMinsLimit}
          label={t('Voice Minutes Used', 'دقائق الصوت المستخدمة')}
        />
        <UsageCard
          title={t('Employee Knowledge Hub', 'مركز معرفة الموظفين')}
          icon="💬"
          used={metrics.questionsUsed}
          limit={metrics.questionsLimit}
          label={t('RAG Questions Answered', 'الأسئلة المجابة')}
        />
      </div>

      {/* Activity Feed */}
      <RecentActivity activities={recentEvents} />
    </div>
  );
}
