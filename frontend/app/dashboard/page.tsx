'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useEntitlements } from '../providers';

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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

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
    // If not in mockMode, we could fetch live usage stats from '/api/usage-stats'
    if (!mockMode) {
      setLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      fetch(`${apiBase}/api/usage-stats`, {
        headers: {
          'Authorization': 'Bearer mock-token-salah-admin' // Sandbox credentials fallback
        }
      })
        .then(res => res.json())
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
        .catch(err => console.error('Failed to fetch usage stats:', err))
        .finally(() => setLoading(false));
    }
  }, [mockMode]);

  const recentAutomation = [
    { id: 1, customer: '+974 5531 ****', action: 'Requested late check-out Room 302', time: '5m ago', type: 'Voice Call', status: 'Resolved' },
    { id: 2, customer: '+974 3324 ****', action: 'Booked Deluxe Room for 3 nights', time: '14m ago', type: 'SMS Booking', status: 'Resolved' },
    { id: 3, customer: '+974 6672 ****', action: 'Lodged air conditioning complaint Room 104', time: '32m ago', type: 'Voice Call', status: 'In Progress' },
    { id: 4, customer: '+974 5541 ****', action: 'Inquired about dinner buffet hours', time: '1h ago', type: 'WhatsApp', status: 'Resolved' },
    { id: 5, customer: '+974 3381 ****', action: 'Requested airport shuttle transfer', time: '2h ago', type: 'SMS Booking', status: 'Pending' },
  ];

  const recentChatbot = [
    { id: 1, employee: 'Sara Al-Mansoori', query: 'What is the vacation rollover policy for 2026?', time: '2m ago', source: 'hr_handbook.pdf' },
    { id: 2, employee: 'John Doe', query: 'How to handle late guests checking in after midnight?', time: '18m ago', source: 'front_desk_sop.pdf' },
    { id: 3, employee: 'Ahmed Al-Thani', query: 'Where do we log mechanical vehicle inspection logs?', time: '41m ago', source: 'safety_sop.pdf' },
    { id: 4, employee: 'Sara Al-Mansoori', query: 'What is the emergency fire exit route for Sector B?', time: '1h ago', source: 'fire_safety.pdf' },
    { id: 5, employee: 'John Doe', query: 'How many days of sick leave are allowed annually?', time: '3h ago', source: 'hr_handbook.pdf' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight">
          {t({ en: 'Good morning, Salah', ar: 'صباح الخير، صلاح' })}
        </h1>
        <p className="text-sm font-semibold text-[#718096] mt-1">
          {t({ en: "Here's your front desk and knowledge hub summary for today.", ar: 'إليك ملخص مكتب الاستقبال ومركز المعرفة لليوم.' })}
        </p>
      </div>

      {/* Usage Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Automation Usage Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
            <span className="text-2xl">📞</span>
            <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Business Automation Usage', ar: 'استخدام أتمتة الأعمال' })}</h2>
          </div>
          
          <div className="space-y-5">
            {/* Progress Bar 1: Texts */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>{t({ en: 'Automation Texts Used', ar: 'نصوص الأتمتة المستخدمة' })}</span>
                <span>{metrics.textsUsed} / {metrics.textsLimit}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#2A5CFF] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.textsUsed / metrics.textsLimit) * 100}%` }}
                />
              </div>
            </div>

            {/* Progress Bar 2: Voice */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>{t({ en: 'Voice Minutes Used', ar: 'دقائق الصوت المستخدمة' })}</span>
                <span>{metrics.voiceMinsUsed} / {metrics.voiceMinsLimit} {t({ en: 'mins', ar: 'دقيقة' })}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.voiceMinsUsed / metrics.voiceMinsLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Usage Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
            <span className="text-2xl">💬</span>
            <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Staff Knowledge Hub Usage', ar: 'استخدام مركز معرفة الموظفين' })}</h2>
          </div>

          <div className="space-y-5">
            {/* Progress Bar 1: Questions */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>{t({ en: 'Questions Answered', ar: 'الأسئلة التي تمت الإجابة عليها' })}</span>
                <span>{metrics.questionsUsed} / {metrics.questionsLimit}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#141F33] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.questionsUsed / metrics.questionsLimit) * 100}%` }}
                />
              </div>
            </div>

            {/* Progress Bar 2: Active Employees */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>{t({ en: 'Active Employees Authorized', ar: 'الموظفون النشطون المعتمدون' })}</span>
                <span>{metrics.employeesUsed} / {metrics.employeesLimit}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#8B5CF6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.employeesUsed / metrics.employeesLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column: Recent Automation Events */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Recent Front Desk Requests', ar: 'طلبات الاستقبال الأخيرة' })}</h3>
            <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Live events captured by automated phone/chat nodes.', ar: 'الفعاليات المباشرة التي تم التقاطها بواسطة عقد الهاتف/الدردشة الآلية.' })}</p>
          </div>
          <div className="flex flex-col">
            {recentAutomation.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-100 py-3.5 last:border-b-0">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-base mt-0.5">📞</span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[#141F33]">{item.customer}</p>
                    <p className="text-xs font-semibold text-[#718096] truncate mt-0.5">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Chatbot Queries */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Recent Staff Knowledge Queries', ar: 'استفسارات الموظفين الأخيرة' })}</h3>
            <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Private questions answered from indexed handbooks & SOPs.', ar: 'الأسئلة الخاصة التي تمت الإجابة عليها من الكتيبات وإجراءات التشغيل.' })}</p>
          </div>
          <div className="flex flex-col">
            {recentChatbot.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-100 py-3.5 last:border-b-0">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-base mt-0.5">💬</span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[#141F33]">{item.employee}</p>
                    <p className="text-xs font-semibold text-[#718096] truncate mt-0.5">"{item.query}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                  <span className="bg-[#141F33]/5 text-[#141F33] text-[9px] font-extrabold px-2 py-0.5 rounded-full truncate max-w-[100px]">
                    {item.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
