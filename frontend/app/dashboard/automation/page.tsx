'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale, useEntitlements } from '../../providers';
import { AutomationQueue } from '../../../components/dashboard/AutomationQueue';
import { AutomationFilters } from '../../../components/dashboard/AutomationFilters';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ResponsiveTable } from '../../../components/ResponsiveTable';
import { PullToRefresh } from '../../../components/PullToRefresh';

interface LiveCall {
  id: string;
  caller: string;
  timestamp: string;
  transcript: string[];
}

interface RequestItem {
  id: string;
  type: string;
  customer: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed';
}

export default function AutomationDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const [activeCalls, setActiveCalls] = useState<LiveCall[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [requests, setRequests] = useState<RequestItem[]>([
    { id: '1', type: 'Late Check-out request', customer: '+974 5531 2981', time: '5m ago', status: 'completed' },
    { id: '2', type: 'Fresh Towels dispatch', customer: '+974 3324 0982', time: '14m ago', status: 'assigned' },
    { id: '3', type: 'AC Repair ticket', customer: '+974 6672 5410', time: '32m ago', status: 'pending' },
    { id: '4', type: 'Dinner Booking request', customer: '+974 5541 3321', time: '1h ago', status: 'completed' },
  ]);

  useEffect(() => {
    if (!mockMode) {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const eventSource = new EventSource(`${apiBase}/api/voice/stream`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.transcriptText) {
            setActiveCalls(() => [
              {
                id: data.id || 'live-call-1',
                caller: data.caller || '+974 5599 ****',
                timestamp: data.timestamp || new Date().toLocaleTimeString(),
                transcript: data.transcriptText ? [data.transcriptText] : [],
              },
            ]);
          }
        } catch (e) {
          console.error('Failed to parse SSE data:', e);
        }
      };

      eventSource.onerror = (err) => {
        console.warn('SSE stream closed or disconnected. Bypassing live feed:', err);
        eventSource.close();
      };

      return () => eventSource.close();
    } else {
      const timer = setTimeout(() => {
        setActiveCalls([
          {
            id: 'mock-call-12',
            caller: '+974 5521 **** (Room 302)',
            timestamp: new Date().toLocaleTimeString(),
            transcript: [
              'Caller: Hello, is it possible to schedule a room cleaning for 11 AM tomorrow?',
              'System: Yes, room cleaning is available for Room 302. I have dispatched this to Housekeeping.',
            ],
          },
        ]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mockMode]);

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch = req.customer.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRefresh = useCallback(async () => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  }, []);

  const handleDoubleTap = useCallback((item: RequestItem) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === item.id && r.status === 'pending'
          ? { ...r, status: 'assigned' }
          : r
      )
    );
  }, []);

  const lastTap = React.useRef<{ id: string; time: number }>({ id: '', time: 0 });
  const handleRequestSelect = useCallback((item: RequestItem) => {
    const now = Date.now();
    if (lastTap.current.id === item.id && now - lastTap.current.time < 300) {
      handleDoubleTap(item);
    }
    lastTap.current = { id: item.id, time: now };
  }, [handleDoubleTap]);

  const statusVariant = (status: string) => {
    if (status === 'completed') return 'success';
    if (status === 'assigned') return 'primary';
    return 'danger';
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#141F33] dark:text-white tracking-tight">
              {t('Operations Automation Hub', 'مركز أتمتة العمليات')}
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 font-bold">
              {t('Manage live calls, dispatch tasks, and coordinate response channels.', 'إدارة المكالمات المباشرة، وتوزيع المهام، وتنسيق قنوات الاستجابة.')}
            </p>
          </div>
        </div>

        {/* Live Calls Widget */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-100 mb-4 md:mb-6">
            <h2 className="text-xs md:text-sm font-black text-[#141F33] dark:text-white flex items-center gap-2 md:gap-3">
              <span>📞</span>
              <span className="hidden md:inline">{t('Live Customer Calls', 'المكالمات الواردة المباشرة')}</span>
              <span className="md:hidden">{t('Live Calls', 'المكالمات المباشرة')}</span>
            </h2>
            <div className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-2.5 md:px-3 py-1 text-[8px] md:text-[9px] font-black text-red-600 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="hidden md:inline">{t('Live stream', 'بث مباشر')}</span>
              <span className="md:hidden">{t('Live', 'مباشر')}</span>
            </div>
          </div>

          {activeCalls.length === 0 ? (
            <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center">
              <span className="text-3xl md:text-4xl opacity-50 mb-3">🔕</span>
              <p className="text-[10px] md:text-xs font-bold text-[#718096]">
                {t('No active calls – desk queue is quiet.', 'لا توجد مكالمات نشطة - طابور الاستقبال هادئ حاليًا.')}
              </p>
            </div>
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

        {/* Request Queue - Mobile card list, desktop table */}
        <div className="space-y-4">
          <AutomationFilters
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />
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
        </div>
      </div>
    </PullToRefresh>
  );
}
export type { RequestItem };
