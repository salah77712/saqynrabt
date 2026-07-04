'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useEntitlements } from '../../providers';
import { AutomationQueue } from '../../../components/dashboard/AutomationQueue';
import { AutomationFilters } from '../../../components/dashboard/AutomationFilters';
import { Card } from '../../../components/ui/Card';

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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white tracking-tight">
            {t('Operations Automation Hub', 'مركز أتمتة العمليات')}
          </h1>
          <p className="text-xs text-slate-500 font-bold">
            {t('Manage live calls, dispatch tasks, and coordinate response channels.', 'إدارة المكالمات المباشرة، وتوزيع المهام، وتنسيق قنوات الاستجابة.')}
          </p>
        </div>
      </div>

      {/* Live Calls (SSE) Widget */}
      <Card className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-6">
          <h2 className="text-sm font-black text-[#141F33] dark:text-white flex items-center gap-3">
            <span>📞</span> {t('Live Customer Calls', 'المكالمات الواردة المباشرة')}
          </h2>
          <div className="flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[9px] font-black text-red-600 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            {t('Live stream', 'بث مباشر')}
          </div>
        </div>

        {activeCalls.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <span className="text-4xl opacity-50 mb-3">🔕</span>
            <p className="text-xs font-bold text-[#718096]">
              {t('No active calls – desk queue is quiet.', 'لا توجد مكالمات نشطة - طابور الاستقبال هادئ حاليًا.')}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeCalls.map((call) => (
              <div key={call.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-gray-200/60 dark:border-slate-700/50 animate-fadeIn">
                <div className="flex items-center justify-between gap-4 border-b border-gray-200/50 dark:border-slate-700/50 pb-3 mb-4">
                  <span className="text-xs font-bold text-navy dark:text-white">{call.caller}</span>
                  <span className="text-[10px] font-bold text-slate-400">{call.timestamp}</span>
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2 max-h-48 overflow-y-auto leading-relaxed">
                  {call.transcript.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Filter and Table queue */}
      <div className="space-y-4">
        <AutomationFilters
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />
        <AutomationQueue
          requests={filteredRequests}
          onSelect={(item) => console.log('Selected request:', item.id)}
        />
      </div>
    </div>
  );
}
export type { RequestItem };
