'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../providers';
import { OverviewMetrics } from '../../components/dashboard/OverviewMetrics';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { MessageSquare, FileText, Users, BarChart3, Check, Zap, ArrowRight } from 'lucide-react';
import { UsageCard } from '../../components/dashboard/UsageCard';
import { SkeletonMetricGrid, SkeletonCard } from '../../components/ui/Skeleton';
import { useUsage } from '../../hooks/queries/useUsage';
import { EmptyState } from '../../components/ui/EmptyState';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { isLoaded, isSignedIn, user } = useUser();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;
  const { data: usage, isLoading, isError, error, refetch } = useUsage(mockMode || !!user);

  const isAuth = mockMode || (isLoaded && isSignedIn);
  if (!isAuth) {
    return (
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <div className="animate-pulse">
<div className="h-8 bg-[#F8F9FB] dark:bg-[#141F33] rounded-lg w-72 mb-2" />
<div className="h-4 bg-[#F8F9FB] dark:bg-[#141F33] rounded-lg w-96" />
        </div>
        <SkeletonMetricGrid />
        <SkeletonCard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (isLoading) return <SkeletonMetricGrid />;

  if (isError || error) return <EmptyState title="Could not load usage" description="Click retry" retry={refetch} />;

  if (!usage || usage.questions_used === 0) return <EmptyState title="No usage yet" description="Start by inviting your team or asking your first question." />;

  const quotaUsagePct = usage ? (usage.questions_used / usage.questions_limit) * 100 : 0;
  const voiceUsagePct = usage ? (usage.voice_minutes_used / (usage.voice_minutes_limit || 1)) * 100 : 0;

  const metrics = [
    { label: t('Questions Answered Today', 'الأسئلة المجابة اليوم'), value: usage?.questions_used ?? 0, change: usage && usage.questions_used > 0 ? `↑ ${Math.round(usage.questions_used / 100)}% today` : t('No activity yet', 'لا يوجد نشاط بعد'), isPositive: true },
    { label: t('Employees Active', 'الموظفون النشطون'), value: usage?.employees_used ?? 0, change: t('Active members', 'أعضاء نشطون'), isPositive: true },
    { label: t('Quota Consumption', 'استهلاك الكوتا'), value: `${Math.round(quotaUsagePct)}%`, change: quotaUsagePct > 80 ? t('High load — near limit', 'حمل مرتفع — بالقرب من الحد') : t('Optimal load', 'حمل مثالي'), isPositive: quotaUsagePct <= 80 },
    { label: t('Voice Minutes', 'دقائق الصوت'), value: `${Math.round(voiceUsagePct)}%`, change: voiceUsagePct > 80 ? t('High usage', 'استخدام مرتفع') : t('Normal rate', 'معدل طبيعي'), isPositive: voiceUsagePct <= 80 },
  ];

  const quickActions = [
    { href: '/dashboard/chat', label: t('New Chat', 'محادثة جديدة'), icon: <MessageSquare className="w-5 h-5" /> },
    { href: '/dashboard/documents', label: t('Upload PDF', 'تحميل ملف PDF'), icon: <FileText className="w-5 h-5" /> },
    { href: '/dashboard/team', label: t('Manage Team', 'إدارة الفريق'), icon: <Users className="w-5 h-5" /> },
    { href: '/dashboard/reports', label: t('View Reports', 'عرض التقارير'), icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const isTrial = usage?.questions_limit === 15;
  const trialBalance = isTrial ? Math.max(0, 5.00 - (usage?.questions_used ?? 0) * 0.33).toFixed(2) : null;

  const step1Completed = (usage?.documents_used ?? 0) > 0;
  const step2Completed = (usage?.questions_used ?? 0) > 0;
  const step3Completed = (usage?.voice_minutes_used ?? 0) > 0;

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#141F33] dark:text-[#F8F9FB] tracking-tight">
            {t('Dashboard', 'لوحة التحكم')}
          </h1>
          <p className="text-xs md:text-sm font-semibold text-[#141F33] mt-1">
            {t('Live data from your active services.', 'بيانات حية من خدماتك النشطة.')}
          </p>
        </div>
        {isTrial && (
<div className="flex items-center gap-3 rounded-full border border-[#2A5CFF]/30 bg-[#F8F9FB] px-4 py-1.5 text-xs font-bold text-[#2A5CFF] self-start md:self-auto">
<span className="h-2 w-2 rounded-full bg-[#2A5CFF] animate-pulse" />
            {t('Free Trial Mode', 'وضع التجربة المجانية')}
          </div>
        )}
      </div>

      {isTrial && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trial Balance & Status Card */}
          <div className="lg:col-span-1 p-8 rounded-[40px] r   text-[#F8F9FB] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-[#2A5CFF]/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#2A5CFF]/25 text-[#2A5CFF] border border-[#2A5CFF]/30 px-2 py-0.5 rounded-md">
                  {t('Free Trial Active', 'النسخة التجريبية نشطة')}
                </span>
                <span className="text-[10px] font-bold text-[#141F33]">{t('Illusion Balance', 'رصيد وهمي')}</span>
              </div>
<h3 className="text-xs text-[#141F33] font-bold uppercase tracking-wider">{t('Trial Credit', 'الرصيد التجريبي')}</h3>
<p className="text-4xl font-black mt-1.5 font-mono">${trialBalance} <span className="text-sm font-bold text-[#141F33]">USD</span></p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#141F33]/10 space-y-1 text-[#141F33] text-[10px] font-bold">
              <div className="flex justify-between">
                <span>{t('Chat Messages:', 'رسائل المحادثة:')}</span>
                <span>{usage?.questions_used ?? 0} / 15</span>
              </div>
              <div className="flex justify-between">
                <span>{t('Voice Call Try:', 'تجربة المكالمة الصوتية:')}</span>
                <span>{usage?.voice_minutes_used ?? 0} / 5 {t('min', 'دقائق')}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Trial Checklist Guide */}
          <div className="lg:col-span-2 p-8 rounded-[40px] bg-[#F8F9FB] border border-[#141F33]/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-black text-[#141F33] uppercase tracking-wide">{t('Trial Onboarding: Step-by-Step Guide', 'إرشاد التجربة: خطوة بخطوة')}</h3>
              <p className="text-[10px] text-[#141F33] font-semibold mt-0.5">{t('Follow these 3 steps to configure and test your AI platform.', 'اتبع هذه الخطوات الـ 3 لتهيئة واختبار منصة الذكاء الاصطناعي الخاصة بك.')}</p>
            </div>
            
            <div className="space-y-3">
              {/* Step 1 */}
<div className="flex items-start gap-4.5 p-3 rounded-[40px] border border-[#141F33]/10 hover:bg-[#141F33] transition-colors">
<span className="text-lg leading-none mt-0.5 select-none">
{step1Completed ? <Check className="w-5 h-5 text-[#2A5CFF]" /> : <span className="font-black text-[#141F33] text-lg">1</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step1Completed ? 'text-[#141F33] line-through font-semibold' : 'text-[#141F33]'}`}>
                      {t('Train Your Chatbot (Upload 1 Document)', 'تدريب روبوت المحادثة (تحميل مستند 1)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step1Completed ? 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10' : 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10'}`}>
                      {step1Completed ? t('Completed', 'مكتمل') : t('Action Required', 'مطلوب إجراء')}
                    </span>
                  </div>
<p className="text-[10px] text-[#141F33] font-medium mt-1 leading-relaxed">
{t('Upload an employee handbook, policy SOP, or FAQ PDF (Limit: 1 PDF during trial) to populate your chatbot knowledge base.', 'قم بتحميل دليل موظف أو ملف PDF للسياسات (الحد: 1 ملف PDF في التجربة) لتغذية قاعدة معرفة المساعد.')}
                  </p>
                    {!step1Completed && (
                    <Link href="/dashboard/documents" className="py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-[#2A5CFF] hover:underline">
                      {t('Upload PDF Document', 'تحميل مستند PDF')} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4.5 p-3 rounded-[40px] border border-[#141F33]/10 hover:bg-[#F8F9FB] transition-colors">
                <span className="text-lg leading-none mt-0.5 select-none">
                  {step2Completed ? <Check className="w-5 h-5 text-[#2A5CFF]" /> : <span className="font-black text-[#141F33] text-lg">2</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step2Completed ? 'text-[#141F33] line-through font-semibold' : 'text-[#141F33]'}`}>
                      {t('Ask Chatbot Questions (15 Trial Messages)', 'اسأل روبوت المحادثة (15 رسالة تجريبية)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step2Completed ? 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10' : 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10'}`}>
                      {step2Completed ? t('Completed', 'مكتمل') : t('Action Required', 'مطلوب إجراء')}
                    </span>
                  </div>
<p className="text-[10px] text-[#141F33] font-medium mt-1 leading-relaxed">
{t('Open the staff knowledge base chatbot and ask a question to test its RAG search accuracy (limit: 15 messages).', 'افتح مساعد معرفة الموظفين واسأله سؤالاً لاختبار دقة بحث RAG (الحد: 15 رسالة).')}
                  </p>
                    {!step2Completed && (
                    <Link href="/dashboard/chat" className="py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-[#2A5CFF] hover:underline">
                      {t('Open Knowledge Chatbot', 'فتح مساعد المعرفة')} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4.5 p-3 rounded-[40px] border border-[#141F33]/10 hover:bg-[#F8F9FB] transition-colors">
                <span className="text-lg leading-none mt-0.5 select-none">
                  {step3Completed ? <Check className="w-5 h-5 text-[#2A5CFF]" /> : <span className="font-black text-[#141F33] text-lg">3</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step3Completed ? 'text-[#141F33] line-through font-semibold' : 'text-[#141F33]'}`}>
                      {t('Try Voice Calls (5 Trial Minutes)', 'تجربة المكالمات الصوتية (5 دقائق تجريبية)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step3Completed ? 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10' : 'bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10'}`}>
                      {step3Completed ? t('Completed', 'مكتمل') : t('Action Required', 'مطلوب إجراء')}
                    </span>
                  </div>
<p className="text-[10px] text-[#141F33] font-medium mt-1 leading-relaxed">
{t('Configure your own PBX, SIP trunk, or virtual number to test the automated front-desk voice reception calls.', 'قم بتهيئة بدالة PBX أو خط SIP أو الرقم الافتراضي الخاص بك لتجربة مكالمات استقبال الصوت التلقائي.')}
                  </p>
                    {!step3Completed && (
                    <Link href="/dashboard/automation" className="py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-[#2A5CFF] hover:underline">
                      {t('Configure Voice Setup', 'تهيئة إعداد الصوت')} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <OverviewMetrics metrics={metrics} />

      <div className="space-y-3">
        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#141F33]">
          {t('Quick Actions', 'إجراءات سريعة')}
        </h3>
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UsageCard
          title={t('Customer Automation', 'أتمتة العملاء')}
          icon={<Zap className="w-5 h-5" />}
          used={usage?.voice_minutes_used ?? 0}
          limit={usage?.voice_minutes_limit ?? 250}
          label={t('Voice Minutes Used', 'دقائق الصوت المستخدمة')}
        />
        <UsageCard
          title={t('Employee Knowledge Hub', 'مركز معرفة الموظفين')}
          icon={<MessageSquare className="w-5 h-5" />}
          used={usage?.questions_used ?? 0}
          limit={usage?.questions_limit ?? 2000}
          label={t('RAG Questions Answered', 'الأسئلة المجابة')}
        />
      </div>
    </div>
  );
}
