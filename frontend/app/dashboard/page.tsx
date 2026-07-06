'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../providers';
import { OverviewMetrics } from '../../components/dashboard/OverviewMetrics';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { UsageCard } from '../../components/dashboard/UsageCard';
import { SkeletonMetricGrid, SkeletonCard } from '../../components/ui/Skeleton';
import { useUsage } from '../../hooks/queries/useUsage';
import { EmptyState } from '../../components/ui/EmptyState';

export default function DashboardOverviewPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { isLoaded, isSignedIn, user } = useUser();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const { data: usage, isLoading, isError, error, refetch } = useUsage(mockMode || !!user);

  const isAuth = mockMode || (isLoaded && isSignedIn);
  if (!isAuth) {
    return (
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-lg w-72 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-lg w-96" />
        </div>
        <SkeletonMetricGrid />
        <SkeletonCard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (isLoading) return <SkeletonMetricGrid />;

  if (isError || error) return <EmptyState title="Could not load usage" description="Click retry" retry={refetch} />;

  if (!usage || usage.questions_used === 0) return <EmptyState title="No usage yet" description="Start by inviting your team or asking your first question." />;

  const metrics = [
    { label: t('Questions Answered Today', 'الأسئلة المجابة اليوم'), value: usage?.questions_used ?? 0, change: usage && usage.questions_used > 0 ? `↑ ${Math.round(usage.questions_used / 100)}% today` : t('No activity yet', 'لا يوجد نشاط بعد'), isPositive: true },
    { label: t('Employees Active', 'الموظفون النشطون'), value: usage?.employees_used ?? 0, change: t('Active members', 'أعضاء نشطون'), isPositive: true },
    { label: t('Quota Consumption', 'استهلاك الكوتا'), value: usage ? `${Math.round((usage.questions_used / usage.questions_limit) * 100)}%` : '0%', change: t('Optimal load', 'حمل مثالي'), isPositive: true },
    { label: t('Voice Minutes', 'دقائق الصوت'), value: usage ? `${Math.round((usage.voice_minutes_used / (usage.voice_minutes_limit || 1)) * 100)}%` : '0%', change: t('Usage rate', 'نسبة الاستخدام'), isPositive: true },
  ];

  const quickActions = [
    { href: '/dashboard/chat', label: t('New Chat', 'محادثة جديدة'), icon: '💬' },
    { href: '/dashboard/documents', label: t('Upload PDF', 'تحميل ملف PDF'), icon: '📄' },
    { href: '/dashboard/team', label: t('Manage Team', 'إدارة الفريق'), icon: '👥' },
    { href: '/dashboard/reports', label: t('View Reports', 'عرض التقارير'), icon: '📊' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#141F33] dark:text-white tracking-tight">
          {t('Dashboard', 'لوحة التحكم')}
        </h1>
        <p className="text-xs md:text-sm font-semibold text-[#718096] mt-1">
          {t('Live data from your active services.', 'بيانات حية من خدماتك النشطة.')}
        </p>
      </div>

      <OverviewMetrics metrics={metrics} />

      <div className="space-y-3">
        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400">
          {t('Quick Actions', 'إجراءات سريعة')}
        </h3>
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <UsageCard
          title={t('Customer Automation', 'أتمتة العملاء')}
          icon="📞"
          used={usage?.voice_minutes_used ?? 0}
          limit={usage?.voice_minutes_limit ?? 250}
          label={t('Voice Minutes Used', 'دقائق الصوت المستخدمة')}
        />
        <UsageCard
          title={t('Employee Knowledge Hub', 'مركز معرفة الموظفين')}
          icon="💬"
          used={usage?.questions_used ?? 0}
          limit={usage?.questions_limit ?? 2000}
          label={t('RAG Questions Answered', 'الأسئلة المجابة')}
        />
      </div>
    </div>
  );
}
