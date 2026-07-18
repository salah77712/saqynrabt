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
<div className="h-8 bg-surface dark:bg-primary rounded-lg w-72 mb-2" />
<div className="h-4 bg-surface dark:bg-primary rounded-lg w-96" />
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
    { label: t('Questions Answered Today', 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ø¬Ø§Ø¨Ø© Ø§Ù„ÙŠÙˆÙ…'), value: usage?.questions_used ?? 0, change: usage && usage.questions_used > 0 ? `â†‘ ${Math.round(usage.questions_used / 100)}% today` : t('No activity yet', 'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù†Ø´Ø§Ø· Ø¨Ø¹Ø¯'), isPositive: true },
    { label: t('Employees Active', 'Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ† Ø§Ù„Ù†Ø´Ø·ÙˆÙ†'), value: usage?.employees_used ?? 0, change: t('Active members', 'Ø£Ø¹Ø¶Ø§Ø¡ Ù†Ø´Ø·ÙˆÙ†'), isPositive: true },
    { label: t('Quota Consumption', 'Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ Ø§Ù„ÙƒÙˆØªØ§'), value: `${Math.round(quotaUsagePct)}%`, change: quotaUsagePct > 80 ? t('High load â€” near limit', 'Ø­Ù…Ù„ Ù…Ø±ØªÙØ¹ â€” Ø¨Ø§Ù„Ù‚Ø±Ø¨ Ù…Ù† Ø§Ù„Ø­Ø¯') : t('Optimal load', 'Ø­Ù…Ù„ Ù…Ø«Ø§Ù„ÙŠ'), isPositive: quotaUsagePct <= 80 },
    { label: t('Voice Minutes', 'Ø¯Ù‚Ø§Ø¦Ù‚ Ø§Ù„ØµÙˆØª'), value: `${Math.round(voiceUsagePct)}%`, change: voiceUsagePct > 80 ? t('High usage', 'Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù…Ø±ØªÙØ¹') : t('Normal rate', 'Ù…Ø¹Ø¯Ù„ Ø·Ø¨ÙŠØ¹ÙŠ'), isPositive: voiceUsagePct <= 80 },
  ];

  const quickActions = [
    { href: '/dashboard/chat', label: t('New Chat', 'Ù…Ø­Ø§Ø¯Ø«Ø© Ø¬Ø¯ÙŠØ¯Ø©'), icon: <MessageSquare className="w-5 h-5" /> },
    { href: '/dashboard/documents', label: t('Upload PDF', 'ØªØ­Ù…ÙŠÙ„ Ù…Ù„Ù PDF'), icon: <FileText className="w-5 h-5" /> },
    { href: '/dashboard/team', label: t('Manage Team', 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙØ±ÙŠÙ‚'), icon: <Users className="w-5 h-5" /> },
    { href: '/dashboard/reports', label: t('View Reports', 'Ø¹Ø±Ø¶ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ±'), icon: <BarChart3 className="w-5 h-5" /> },
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
            {t('Dashboard', 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…')}
          </h1>
          <p className="text-xs md:text-sm font-semibold text-primary mt-1">
            {t('Live data from your active services.', 'Ø¨ÙŠØ§Ù†Ø§Øª Ø­ÙŠØ© Ù…Ù† Ø®Ø¯Ù…Ø§ØªÙƒ Ø§Ù„Ù†Ø´Ø·Ø©.')}
          </p>
        </div>
        {isTrial && (
<div className="flex items-center gap-3 rounded-full border border-accent/30 bg-surface px-4 py-1.5 text-xs font-bold text-accent self-start md:self-auto">
<span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t('Free Trial Mode', 'ÙˆØ¶Ø¹ Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø¬Ø§Ù†ÙŠØ©')}
          </div>
        )}
      </div>

      {isTrial && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trial Balance & Status Card */}
          <div className="lg:col-span-1 p-8 rounded-xl bg-primary text-surface shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute end-0 top-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-accent/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-accent/25 text-accent border border-accent/30 px-2 py-0.5 rounded-md">
                  {t('Free Trial Active', 'Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù†Ø´Ø·Ø©')}
                </span>
                <span className="text-[10px] font-bold text-primary">{t('Illusion Balance', 'Ø±ØµÙŠØ¯ ÙˆÙ‡Ù…ÙŠ')}</span>
              </div>
<h3 className="text-xs text-primary font-bold uppercase tracking-wider">{t('Trial Credit', 'Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ')}</h3>
<p className="text-4xl font-black mt-1.5 font-mono">${trialBalance} <span className="text-sm font-bold text-primary">USD</span></p>
            </div>
            <div className="mt-4 pt-4 border-t border-primary/10 space-y-1 text-primary text-[10px] font-bold">
              <div className="flex justify-between">
                <span>{t('Chat Messages:', 'Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø©:')}</span>
                <span>{usage?.questions_used ?? 0} / 15</span>
              </div>
              <div className="flex justify-between">
                <span>{t('Voice Call Try:', 'ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø© Ø§Ù„ØµÙˆØªÙŠØ©:')}</span>
                <span>{usage?.voice_minutes_used ?? 0} / 5 {t('min', 'Ø¯Ù‚Ø§Ø¦Ù‚')}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Trial Checklist Guide */}
          <div className="lg:col-span-2 p-8 rounded-xl bg-surface border border-primary/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-wide">{t('Trial Onboarding: Step-by-Step Guide', 'Ø¥Ø±Ø´Ø§Ø¯ Ø§Ù„ØªØ¬Ø±Ø¨Ø©: Ø®Ø·ÙˆØ© Ø¨Ø®Ø·ÙˆØ©')}</h3>
              <p className="text-[10px] text-primary font-semibold mt-0.5">{t('Follow these 3 steps to configure and test your AI platform.', 'Ø§ØªØ¨Ø¹ Ù‡Ø°Ù‡ Ø§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ù€ 3 Ù„ØªÙ‡ÙŠØ¦Ø© ÙˆØ§Ø®ØªØ¨Ø§Ø± Ù…Ù†ØµØ© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.')}</p>
            </div>
            
            <div className="space-y-3">
              {/* Step 1 */}
<div className="flex items-start gap-4.5 p-3 rounded-xl border border-primary/10 hover:bg-primary transition-colors">
<span className="text-lg leading-none mt-0.5 select-none">
{step1Completed ? <Check className="w-5 h-5 text-accent" /> : <span className="font-black text-primary text-lg">1</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step1Completed ? 'text-primary line-through font-semibold' : 'text-primary'}`}>
                      {t('Train Your Chatbot (Upload 1 Document)', 'ØªØ¯Ø±ÙŠØ¨ Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© (ØªØ­Ù…ÙŠÙ„ Ù…Ø³ØªÙ†Ø¯ 1)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step1Completed ? 'bg-surface text-accent border border-accent/10' : 'bg-surface text-accent border border-accent/10'}`}>
                      {step1Completed ? t('Completed', 'Ù…ÙƒØªÙ…Ù„') : t('Action Required', 'Ù…Ø·Ù„ÙˆØ¨ Ø¥Ø¬Ø±Ø§Ø¡')}
                    </span>
                  </div>
<p className="text-[10px] text-primary font-medium mt-1 leading-relaxed">
{t('Upload an employee handbook, policy SOP, or FAQ PDF (Limit: 1 PDF during trial) to populate your chatbot knowledge base.', 'Ù‚Ù… Ø¨ØªØ­Ù…ÙŠÙ„ Ø¯Ù„ÙŠÙ„ Ù…ÙˆØ¸Ù Ø£Ùˆ Ù…Ù„Ù PDF Ù„Ù„Ø³ÙŠØ§Ø³Ø§Øª (Ø§Ù„Ø­Ø¯: 1 Ù…Ù„Ù PDF ÙÙŠ Ø§Ù„ØªØ¬Ø±Ø¨Ø©) Ù„ØªØºØ°ÙŠØ© Ù‚Ø§Ø¹Ø¯Ø© Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯.')}
                  </p>
                    {!step1Completed && (
                    <Link href="/dashboard/documents" className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-accent hover:underline">
                      {t('Upload PDF Document', 'ØªØ­Ù…ÙŠÙ„ Ù…Ø³ØªÙ†Ø¯ PDF')} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4.5 p-3 rounded-xl border border-primary/10 hover:bg-surface transition-colors">
                <span className="text-lg leading-none mt-0.5 select-none">
                  {step2Completed ? <Check className="w-5 h-5 text-accent" /> : <span className="font-black text-primary text-lg">2</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step2Completed ? 'text-primary line-through font-semibold' : 'text-primary'}`}>
                      {t('Ask Chatbot Questions (15 Trial Messages)', 'Ø§Ø³Ø£Ù„ Ø±ÙˆØ¨ÙˆØª Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© (15 Ø±Ø³Ø§Ù„Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ©)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step2Completed ? 'bg-surface text-accent border border-accent/10' : 'bg-surface text-accent border border-accent/10'}`}>
                      {step2Completed ? t('Completed', 'Ù…ÙƒØªÙ…Ù„') : t('Action Required', 'Ù…Ø·Ù„ÙˆØ¨ Ø¥Ø¬Ø±Ø§Ø¡')}
                    </span>
                  </div>
<p className="text-[10px] text-primary font-medium mt-1 leading-relaxed">
{t('Open the staff knowledge base chatbot and ask a question to test its RAG search accuracy (limit: 15 messages).', 'Ø§ÙØªØ­ Ù…Ø³Ø§Ø¹Ø¯ Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† ÙˆØ§Ø³Ø£Ù„Ù‡ Ø³Ø¤Ø§Ù„Ø§Ù‹ Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø¯Ù‚Ø© Ø¨Ø­Ø« RAG (Ø§Ù„Ø­Ø¯: 15 Ø±Ø³Ø§Ù„Ø©).')}
                  </p>
                    {!step2Completed && (
                    <Link href="/dashboard/chat" className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-accent hover:underline">
                      {t('Open Knowledge Chatbot', 'ÙØªØ­ Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ù…Ø¹Ø±ÙØ©')} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4.5 p-3 rounded-xl border border-primary/10 hover:bg-surface transition-colors">
                <span className="text-lg leading-none mt-0.5 select-none">
                  {step3Completed ? <Check className="w-5 h-5 text-accent" /> : <span className="font-black text-primary text-lg">3</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`text-xs font-bold ${step3Completed ? 'text-primary line-through font-semibold' : 'text-primary'}`}>
                      {t('Try Voice Calls (5 Trial Minutes)', 'ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„ØµÙˆØªÙŠØ© (5 Ø¯Ù‚Ø§Ø¦Ù‚ ØªØ¬Ø±ÙŠØ¨ÙŠØ©)')}
                    </h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${step3Completed ? 'bg-surface text-accent border border-accent/10' : 'bg-surface text-accent border border-accent/10'}`}>
                      {step3Completed ? t('Completed', 'Ù…ÙƒØªÙ…Ù„') : t('Action Required', 'Ù…Ø·Ù„ÙˆØ¨ Ø¥Ø¬Ø±Ø§Ø¡')}
                    </span>
                  </div>
<p className="text-[10px] text-primary font-medium mt-1 leading-relaxed">
{t('Configure your own PBX, SIP trunk, or virtual number to test the automated front-desk voice reception calls.', 'Ù‚Ù… Ø¨ØªÙ‡ÙŠØ¦Ø© Ø¨Ø¯Ø§Ù„Ø© PBX Ø£Ùˆ Ø®Ø· SIP Ø£Ùˆ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ Ù„ØªØ¬Ø±Ø¨Ø© Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„ØµÙˆØª Ø§Ù„ØªÙ„Ù‚Ø§Ø¦ÙŠ.')}
                  </p>
                    {!step3Completed && (
                    <Link href="/dashboard/automation" className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 inline-block mt-2.5 text-[10px] font-black text-accent hover:underline">
                      {t('Configure Voice Setup', 'ØªÙ‡ÙŠØ¦Ø© Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØµÙˆØª')} <ArrowRight className="w-3 h-3 inline" />
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
        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-primary">
          {t('Quick Actions', 'Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø³Ø±ÙŠØ¹Ø©')}
        </h3>
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UsageCard
          title={t('Customer Automation', 'Ø£ØªÙ…ØªØ© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡')}
          icon={<Zap className="w-5 h-5" />}
          used={usage?.voice_minutes_used ?? 0}
          limit={usage?.voice_minutes_limit ?? 250}
          label={t('Voice Minutes Used', 'Ø¯Ù‚Ø§Ø¦Ù‚ Ø§Ù„ØµÙˆØª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©')}
        />
        <UsageCard
          title={t('Employee Knowledge Hub', 'Ù…Ø±ÙƒØ² Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†')}
          icon={<MessageSquare className="w-5 h-5" />}
          used={usage?.questions_used ?? 0}
          limit={usage?.questions_limit ?? 2000}
          label={t('RAG Questions Answered', 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ø¬Ø§Ø¨Ø©')}
        />
      </div>
    </div>
  );
}
