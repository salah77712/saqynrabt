'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface OmnichannelMessage {
  id: string;
  sender: string;
  body: string;
  channel: 'WhatsApp' | 'SMS' | 'WebChat' | 'Email';
  timestamp: string;
}

export default function OmnichannelInboxPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [messages, setMessages] = useState<OmnichannelMessage[]>([
    { id: 'm-1', sender: '+974 5555 1234', body: 'I need to cancel my booking.', channel: 'WhatsApp', timestamp: '2026-07-04T12:00:00Z' },
    { id: 'm-2', sender: 'support@alsafa.qa', body: 'SOP file is missing in chatbot chunks.', channel: 'Email', timestamp: '2026-07-04T12:05:00Z' },
  ]);

  const [filterChannel, setFilterChannel] = useState<string>('All');

  const filtered = filterChannel === 'All' ? messages : messages.filter(m => m.channel === filterChannel);

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Unified Omnichannel Inbox', ar: 'صندوق البريد الموحد للقنوات' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Aggregate client messages from WhatsApp, SMS, Web Chat, and Email.', ar: 'تجميع رسائل العملاء من الواتساب، الرسائل النصية، المحادثات، والبريد الإلكتروني.' })}</p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 text-xs font-bold">
        {['All', 'WhatsApp', 'Email', 'SMS'].map((ch) => (
          <button
            key={ch}
            onClick={() => setFilterChannel(ch)}
            className={`px-4 py-2 rounded-xl border transition-all ${
              filterChannel === ch
                ? 'bg-[#141F33] border-[#141F33] text-white'
                : 'bg-white border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Inbox List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-400 font-semibold text-center py-6">No messages found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((msg) => (
              <div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#141F33]">{msg.sender}</span>
                    <span className="bg-slate-100 text-slate-600 font-mono text-[8px] font-extrabold px-2 py-0.5 rounded-full border border-slate-200">
                      {msg.channel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1 leading-normal">{msg.body}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold shrink-0">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
