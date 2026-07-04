'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useEntitlements } from '../../providers';

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
  status: 'Pending' | 'In Progress' | 'Resolved';
  department: string;
}

export default function AutomationDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [activeCalls, setActiveCalls] = useState<LiveCall[]>([]);
  const [selectedDept, setSelectedDept] = useState('all');

  const [requests, setRequests] = useState<RequestItem[]>([
    { id: '1', type: 'Late Check-out', customer: '+974 5531 2981', time: '5m ago', status: 'Resolved', department: 'Front Desk' },
    { id: '2', type: 'Fresh Towels', customer: '+974 3324 0982', time: '14m ago', status: 'In Progress', department: 'Housekeeping' },
    { id: '3', type: 'AC Repair', customer: '+974 6672 5410', time: '32m ago', status: 'Pending', department: 'Maintenance' },
    { id: '4', type: 'Dinner Booking', customer: '+974 5541 3321', time: '1h ago', status: 'Resolved', department: 'Front Desk' },
  ]);

  // Allowed departments based on company entitlements
  const allowedDepts = ['Front Desk', 'Housekeeping', 'Maintenance'];

  useEffect(() => {
    if (!mockMode) {
      // Connect to Server-Sent Events stream for live call updates
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const eventSource = new EventSource(`${apiBase}/api/voice/stream`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.transcriptText) {
            // Update active calls list
            setActiveCalls((prev) => {
              const updatedCall = {
                id: data.id || 'live-call-1',
                caller: data.caller || '+974 5599 ****',
                timestamp: data.timestamp || new Date().toLocaleTimeString(),
                transcript: data.transcriptText ? [data.transcriptText] : [],
              };
              return [updatedCall];
            });
          }
        } catch (e) {
          console.error('Failed to parse SSE data:', e);
        }
      };

      eventSource.onerror = (err) => {
        console.warn('SSE stream closed or disconnected. Bypassing live feed:', err);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    } else {
      // Sandbox Mode: simulate a live call after 4 seconds
      const timer = setTimeout(() => {
        setActiveCalls([
          {
            id: 'mock-call-12',
            caller: '+974 5521 **** (Room 302)',
            timestamp: new Date().toLocaleTimeString(),
            transcript: [
              'Caller: Hello, is it possible to schedule a room cleaning for 11 AM tomorrow?',
              'System: Yes, room cleaning is available for Room 302. I have dispatched this to Housekeeping.'
            ]
          }
        ]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mockMode]);

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'In Progress' | 'Resolved') => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const handleDeptChange = (id: string, newDept: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, department: newDept } : req));
  };

  const filteredRequests = selectedDept === 'all'
    ? requests
    : requests.filter(req => req.department.toLowerCase() === selectedDept.toLowerCase());

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141F33] tracking-tight">
            {t({ en: 'Front Desk Automation Hub', ar: 'مركز أتمتة الاستقبال' })}
          </h1>
          <p className="text-sm font-semibold text-[#718096] mt-0.5">
            {t({ en: 'Manage live calls, dispatch tasks, and configure routing rules.', ar: 'إدارة المكالمات المباشرة، وتوزيع المهام، وتكوين قواعد التوجيه.' })}
          </p>
        </div>
        
        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="dept-filter" className="text-xs font-bold text-[#718096] uppercase tracking-wider">{t({ en: 'Filter:', ar: 'تصفية:' })}</label>
          <select
            id="dept-filter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-[#141F33] focus:outline-none focus:ring-2 focus:ring-[#141F33] cursor-pointer"
          >
            <option value="all">{t({ en: 'All Departments', ar: 'جميع الأقسام' })}</option>
            {allowedDepts.map(dept => (
              <option key={dept} value={dept.toLowerCase()}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Calls (SSE) Widget */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-lg font-extrabold text-[#141F33] flex items-center gap-3">
            <span>📞</span> {t({ en: 'Live Customer Calls', ar: 'المكالمات الواردة المباشرة' })}
          </h2>
          <div className="flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[10px] font-extrabold text-red-600 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {t({ en: 'Live stream', ar: 'بث مباشر' })}
          </div>
        </div>

        {activeCalls.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <span className="text-4xl opacity-50 mb-3">🔕</span>
            <p className="text-sm font-bold text-[#718096]">
              {t({ en: 'No active calls – the front desk is quiet.', ar: 'لا توجد مكالمات نشطة - مكتب الاستقبال هادئ حاليًا.' })}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeCalls.map((call) => (
              <div key={call.id} className="bg-slate-50 rounded-xl p-5 border border-gray-200/60 animate-fadeIn">
                <div className="flex items-center justify-between gap-4 border-b border-gray-200/50 pb-3 mb-4">
                  <span className="text-xs font-extrabold text-[#141F33]">{call.caller}</span>
                  <span className="text-[10px] font-bold text-slate-400">{call.timestamp}</span>
                </div>
                <div className="font-mono text-xs text-slate-700 space-y-2 max-h-48 overflow-y-auto leading-relaxed">
                  {call.transcript.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Queue Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Incoming Request Queue', ar: 'طابور الطلبات الواردة' })}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                <th className="px-6 py-4">{t({ en: 'Request Type', ar: 'نوع الطلب' })}</th>
                <th className="px-6 py-4">{t({ en: 'Customer', ar: 'العميل' })}</th>
                <th className="px-6 py-4">{t({ en: 'Time', ar: 'الوقت' })}</th>
                <th className="px-6 py-4">{t({ en: 'Department', ar: 'القسم' })}</th>
                <th className="px-6 py-4">{t({ en: 'Status', ar: 'الحالة' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#141F33]">{req.type}</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{req.customer}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-400">{req.time}</td>
                  <td className="px-6 py-4">
                    <select
                      value={req.department}
                      onChange={(e) => handleDeptChange(req.id, e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#141F33]"
                    >
                      {allowedDepts.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                        req.status === 'Resolved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                        req.status === 'In Progress' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                        'bg-amber-50 border-amber-200 text-amber-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
