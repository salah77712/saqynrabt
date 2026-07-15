'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../../providers';

interface OmnichannelMessage {
id: string;
sender: string;
body: string;
channel: 'WhatsApp' | 'SMS' | 'WebChat' | 'Email';
timestamp: string;
}

const MOCK_MESSAGES: OmnichannelMessage[] = [
{ id: 'm-1', sender: '+974 5555 1234', body: 'I need to cancel my booking.', channel: 'WhatsApp', timestamp: '2026-07-04T12:00:00Z' },
{ id: 'm-2', sender: 'support@alsafa.qa', body: 'SOP file is missing in chatbot chunks.', channel: 'Email', timestamp: '2026-07-04T12:05:00Z' },
];

export default function OmnichannelInboxPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [messages, setMessages] = useState<OmnichannelMessage[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [filterChannel, setFilterChannel] = useState<string>('All');

useEffect(() => {
fetch('/api/chat/history')
.then(res => res.json())
.then((data: any) => {
const list = Array.isArray(data) ? data : data?.messages || data?.history || [];
if (list.length > 0) {
setMessages(list.slice(0, 20));
} else {
setMessages(MOCK_MESSAGES);
}
})
.catch(() => {
setError(true);
setMessages(MOCK_MESSAGES);
})
.finally(() => setLoading(false));
}, []);

const filtered = filterChannel === 'All' ? messages : messages.filter(m => m.channel === filterChannel);

return (
<div className="space-y-6 animate-fadeIn max-w-xl">

{/* Header */}
<div>
<h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Inbox', ar: 'صندوق البريد الموحد للقنوات' })}</h1>
<p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'WhatsApp, SMS, web chat, and email — all in one place.', ar: 'تجميع رسائل العملاء من الواتساب، الرسائل النصية، المحادثات، والبريد الإلكتروني.' })}</p>
</div>

{error && (
<div className="bg-[#F8F9FB] border border-[#141F33]/10 text-[#2A5CFF] rounded-[40px] p-3 text-xs font-semibold">
{t({ en: 'Could not load fresh data. Showing sample messages.', ar: 'تعذر تحميل البيانات الحديثة. يتم عرض رسائل نموذجية.' })}
</div>
)}

{/* Filter Chips */}
<div className="flex gap-3 text-xs font-bold">
{['All', 'WhatsApp', 'Email', 'SMS'].map((ch) => (
<button
key={ch}
onClick={() => setFilterChannel(ch)}
className={`px-6 py-3 rounded-[40px] text-xs font-bold min-h-[44px] border transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
            filterChannel === ch
              ? 'bg-[#141F33] border-[#141F33] text-[#F8F9FB]'
              : 'bg-[#F8F9FB] border-[#141F33]/10 text-[#141F33] hover:bg-[#141F33]'
            }`}
>
{ch}
</button>
))}
</div>

{/* Inbox List */}
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm">
{loading ? (
<p className="text-xs text-[#141F33] font-semibold text-center py-6">
{t({ en: 'Loading messages...', ar: 'جاري تحميل الرسائل...' })}
</p>
) : filtered.length === 0 ? (
<p className="text-xs text-[#141F33] font-semibold text-center py-6">
{t({ en: 'No messages found.', ar: 'لم يتم العثور على رسائل.' })}
</p>
) : (
<div className="divide-y divide-[#141F33]/10">
{filtered.map((msg) => (
<div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-8">
<div className="min-w-0">
<div className="flex items-center gap-3">
<span className="text-xs font-extrabold text-[#141F33]">{msg.sender}</span>
<span className="bg-[#F8F9FB] text-[#141F33] font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#141F33]/10">
{msg.channel}
</span>
</div>
<p className="text-xs text-[#141F33] font-semibold mt-1 leading-normal">{msg.body}</p>
</div>
<span className="text-[10px] text-[#141F33] font-bold shrink-0">{new Date(msg.timestamp).toLocaleTimeString()}</span>
</div>
))}
</div>
)}
</div>

</div>
);
}