'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../providers';
import { AutomationQueue } from '../../../components/dashboard/AutomationQueue';
import { AutomationFilters } from '../../../components/dashboard/AutomationFilters';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { SkeletonCard, SkeletonTable } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry, EmptyAutomationState, EmptyState } from '../../../components/ui/EmptyState';
import { useAutomationRequests } from '../../../hooks/queries/useAutomationRequests';
import { PullToRefresh } from '../../../components/PullToRefresh';
import { PhoneIcon } from '../../../components/ui/Icons';

export default function AutomationDashboardPage() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const { data, isLoading, isError, error, refetch } = useAutomationRequests();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const requests = data?.requests ?? [];
  const activeCalls = data?.activeCalls ?? [];

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch = (req.customer || '').toLowerCase().includes(search?.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const lastTap = React.useRef<{ id: string; time: number }>({ id: '', time: 0 });
  const handleRequestSelect = useCallback((item: any) => {
    const now = Date.now();
    if (lastTap.current.id === item.id && now - lastTap.current.time < 300) {
    }
    lastTap.current = { id: item.id, time: now };
  }, []);

  const statusVariant = (status: string) => {
    if (status === 'completed') return 'success';
    if (status === 'assigned') return 'primary';
    return 'danger';
  };

  if (isLoading) return <SkeletonTable />;

  if (isError || error) return <EmptyState title="Could not load requests" retry={refetch} />;

  if (data && data.requests?.length === 0 && data.activeCalls?.length === 0) {
    return <EmptyState title="Live guest queue" description="No pending requests. Everything's running smoothly." />;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#141F33] dark:text-white tracking-tight">
              {t('Automation', 'مركز أتمتة العمليات')}
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 font-bold">
              {t('Live calls, dispatch tasks, and channel activity.', 'إدارة المكالمات المباشرة، وتوزيع المهام، وتنسيق قنوات الاستجابة.')}
            </p>
          </div>
        </div>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-100 mb-4 md:mb-6">
            <h2 className="text-xs md:text-sm font-black text-[#141F33] dark:text-white flex items-center gap-2 md:gap-3">
              <PhoneIcon className="w-4 h-4 text-slate-500" />
              <span>{t('Live Customer Calls', 'المكالمات الواردة المباشرة')}</span>
            </h2>
            <div className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-2.5 md:px-3 py-1 text-[8px] md:text-[9px] font-black text-red-600 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{t('Live', 'مباشر')}</span>
            </div>
          </div>

          {activeCalls.length === 0 ? (
            <EmptyAutomationState />
          ) : (
            <div className="space-y-4 md:space-y-6">
              {activeCalls.map((call) => (
                <div key={call.id} className="bg-slate-50 rounded-xl p-4 md:p-5 border border-gray-200/60 animate-fadeIn">
                  <div className="flex items-center justify-between gap-4 border-b border-gray-200/50 pb-3 mb-3">
                    <span className="text-[11px] md:text-xs font-bold text-navy">{call.caller}</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-400">{call.timestamp}</span>
                  </div>
                  <div className="font-mono text-[10px] md:text-xs text-slate-700 space-y-2 max-h-36 md:max-h-48 overflow-y-auto leading-relaxed">
                    {call.transcript.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-4">
          <AutomationFilters
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />
          {filteredRequests.length === 0 ? (
            <EmptyAutomationState />
          ) : (
            <>
              <div className="md:hidden">
                <div className="space-y-3">
                  {filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      onClick={() => handleRequestSelect(req)}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#141F33]">{req.customer}</span>
                        <Badge variant={statusVariant(req.status) as any}>{req.status}</Badge>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-600">{req.type}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">{req.time}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                <AutomationQueue
                  requests={filteredRequests}
                  onSelect={handleRequestSelect}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </PullToRefresh>
  );
}
