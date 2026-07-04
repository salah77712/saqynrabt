'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function AnalyticsPage() {
  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Admin Operations Console</h1>
          <p className="text-xs text-slate-500 font-bold">Real-time metrics, active client billing and ARR tracking.</p>
        </div>
        <Badge variant="success">Edge Nodes Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">Monthly Recurring Revenue</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">QAR 189,450</p>
          <p className="text-xs text-emerald-500 font-bold mt-2">↑ 14% from last month</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">Annual Run Rate</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">QAR 2.27M</p>
          <p className="text-xs text-emerald-500 font-bold mt-2">↑ 18.2% YoY growth</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">Active Companies</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">114</p>
          <p className="text-xs text-slate-400 font-bold mt-2">0 churn cases</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">Monthly Questions Usage</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">482,900</p>
          <p className="text-xs text-orange-500 font-bold mt-2">72% of total capacity</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="font-bold text-navy dark:text-white mb-4">Traffic & AI Spikes (Last 24 Hours)</h3>
        <div className="h-64 flex items-end justify-between gap-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          {[40, 65, 30, 85, 45, 95, 70, 55, 90, 100, 35, 60].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="bg-[#141F33] dark:bg-royal w-full rounded-t-md transition-all hover:scale-[1.05]" style={{ height: `${h}%` }} />
              <span className="text-[9px] font-bold text-slate-400">{i * 2}h</span>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
