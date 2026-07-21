'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../providers';
import { AutomationQueue } from '../../../components/dashboard/AutomationQueue';
import { AutomationFilters } from '../../../components/dashboard/AutomationFilters';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';
import { SkeletonCard, SkeletonTable } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry, EmptyAutomationState, EmptyState } from '../../../components/ui/EmptyState';
import { useAutomationRequests } from '../../../hooks/queries/useAutomationRequests';
import { PullToRefresh } from '../../../components/PullToRefresh';
import { Zap } from 'lucide-react';

export default function AutomationDashboardPage() {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;
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
if (lastTap.current.id === item.id && now - lastTap.current.time < 300) {}
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
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
{t('Automation', 'مركز أتمتة العمليات')}
</h1>
<p className="text-xs md:text-xs text-primary font-bold">
{t('Live calls, dispatch tasks, and channel activity.', 'إدارة المكالمات المباشرة، وتوزيع المهام، وتنسيق قنوات الاستجابة.')}
</p>
</div>
</div>

<Card className="p-8 rounded-xl">
<div className="flex items-center justify-between pb-3 md:pb-4 border-b border-primary/10 mb-4 md:mb-6">
<h2 className="text-xs md:text-sm font-extrabold text-primary dark:text-surface flex items-center gap-3 md:gap-4">
<Zap className="w-4 h-4 text-primary" />
<span>{t('Live Customer Calls', 'المكالمات الواردة المباشرة')}</span>
</h2>
<div className="flex items-center gap-1.5 rounded-full bg-surface border border-primary/10 px-2.5 md:px-3 py-1 text-xs md:text-xs font-extrabold text-primary uppercase tracking-widest">
<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
<span>{t('Live', 'مباشر')}</span>
</div>
</div>

{activeCalls.length === 0 ? (
<EmptyAutomationState />
) : (
        <div className="gap-8 md:space-y-6">
{activeCalls.map((call) => (
<div key={call.id} className="bg-surface rounded-xl p-8 border border-primary/10 animate-fadeIn">
<div className="flex items-center justify-between gap-8 border-b border-primary/10 pb-3 mb-3">
<span className="text-[11px] md:text-xs font-bold text-navy">{call.caller}</span>
<span className="text-xs md:text-xs font-bold text-primary">{call.timestamp}</span>
</div>
<div className="font-mono text-xs md:text-xs text-primary space-y-2 max-h-36 md:max-h-48 overflow-y-auto leading-relaxed">
{call.transcript.map((line, idx) => (
<p key={idx}>{line}</p>
))}
</div>
</div>
))}
</div>
)}
</Card>

<div className="space-y-6">
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
className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm active:scale-[0.98] transition-transform"
>
<div className="flex items-center justify-between mb-2">
<span className="text-xs font-bold text-primary">{req.customer}</span>
<Badge variant={statusVariant(req.status) as any}>{req.status}</Badge>
</div>
<p className="text-[11px] font-semibold text-primary">{req.type}</p>
<p className="text-xs text-primary/40 mt-1.5">{req.time}</p>
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