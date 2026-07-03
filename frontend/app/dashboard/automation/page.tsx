'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useEntitlements } from '../../providers';

interface QueueItem {
  id: string;
  source: string;
  payload: string;
  status: 'Pending' | 'Routed' | 'Resolved';
  time: string;
}

export default function AutomationPage() {
  const { getToken } = useAuth();
  const { entitlements, mockMode } = useEntitlements();
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'Q-01', source: 'WhatsApp Webhook', payload: 'Guest room 305 requesting extra pillows', status: 'Pending', time: '10 mins ago' },
    { id: 'Q-02', source: 'SMS Alert', payload: 'Patient check-in check: Tariq Mahmood', status: 'Routed', time: '18 mins ago' },
    { id: 'Q-03', source: 'Internal Portal', payload: 'Brake pads inventory low warning', status: 'Resolved', time: '1 hour ago' }
  ]);

  const handleRunAutomation = async () => {
    setLoading(true);
    
    if (mockMode) {
      setTimeout(() => {
        setQueue(prev => 
          prev.map(q => q.status === 'Pending' ? { ...q, status: 'Routed' } : q)
        );
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/automation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company_id: 'dummy_company' }),
      });
      if (response.ok) {
        // Refresh queue
        setQueue(prev => 
          prev.map(q => q.status === 'Pending' ? { ...q, status: 'Routed' } : q)
        );
      }
    } catch (err) {
      console.error("Failed to run routing automation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Guest & Client Queue</h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor and route inbound customer requests automatically to appropriate departments.
          </p>
        </div>
        <button
          onClick={handleRunAutomation}
          disabled={loading}
          className="px-6 font-bold bg-brand-500 hover:bg-brand-600 text-dark-900 rounded-lg transition-colors flex items-center justify-center gap-2"
          style={{ minHeight: '44px' }}
        >
          {loading ? 'Processing Queue...' : 'Execute Queue Dispatcher'}
        </button>
      </div>

      {/* Queue List */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-dark-900/60 border-b border-dark-700 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-300">Live Request Feed</h2>
          <span className="text-xs text-slate-500 font-mono">3 active channels</span>
        </div>

        <div className="divide-y divide-dark-700">
          {queue.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-900/10 transition-colors">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-dark-900 border border-dark-700 px-2 py-0.5 rounded font-mono text-slate-400">
                    {item.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{item.source}</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">{item.payload}</p>
                <span className="text-[10px] text-slate-500 font-medium">{item.time}</span>
              </div>

              <span className={`px-3 py-1 text-xs rounded-full font-bold border self-start sm:self-center ${
                item.status === 'Resolved' 
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20' 
                  : item.status === 'Routed' 
                  ? 'bg-blue-950/80 text-blue-400 border-blue-500/20' 
                  : 'bg-amber-950/80 text-amber-400 border-amber-500/20'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State Rule 3 implementation */}
      <div className="bg-dark-800 border border-dashed border-dark-700 p-8 rounded-xl text-center">
        <span className="text-3xl block mb-2">🎉</span>
        <h3 className="text-sm font-semibold text-slate-300">Queue Operations Clean</h3>
        <p className="text-xs text-slate-500 mt-1">All clear. No pending requests.</p>
      </div>

    </div>
  );
}
