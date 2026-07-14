'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';

interface WorkflowItem {
id: string;
name: string;
trigger: string;
action: string;
active: boolean;
}

export default function AutomationWorkflowsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [workflows, setWorkflows] = useState<WorkflowItem[]>([
{ id: 'w-1', name: 'Alert Reception on Bookings', trigger: 'booking.created', action: 'Send Slack Notification', active: true },
{ id: 'w-2', name: 'Log Complaints in CRM', trigger: 'complaint.routed', action: 'Trigger outbound Webhook', active: true },
]);

const [newWorkflow, setNewWorkflow] = useState({
name: '',
trigger: 'booking.created',
action: 'Send Slack Notification',
});

const handleToggle = (id: string) => {
  setWorkflows(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
};

const handleCreate = (e: React.FormEvent) => {
e.preventDefault();
if (!newWorkflow.name.trim()) return;

const mockNew: WorkflowItem = {
id: `w-${Date.now()}`,
name: newWorkflow.name,
trigger: newWorkflow.trigger,
action: newWorkflow.action,
active: true,
};

setWorkflows(prev => [...prev, mockNew]);
setNewWorkflow({ name: '', trigger: 'booking.created', action: 'Send Slack Notification' });
};

return (
<div className="space-y-6 animate-fadeIn max-w-xl">

{/* Header */}
<div>
<h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Workflows', ar: 'منشئ مسارات العمل المخصصة' })}</h1>
<p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Set up actions and notifications for automation events.', ar: 'تهيئة الإجراءات والتنبيهات الناتجة عن أحداث الأتمتة.' })}</p>
</div>

{/* Form Builder */}
<form onSubmit={handleCreate} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm space-y-4">

<div>
<label htmlFor="name" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Workflow Rule Name', ar: 'اسم قاعدة سير العمل' })}</label>
<input
type="text"
id="name"
value={newWorkflow.name}
onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
placeholder="E.g. Slack alert for emergency bookings"
className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
required
/>
</div>

<div className="grid grid-cols-2 gap-4">
<div>
<label htmlFor="trigger" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'When this happens...', ar: 'عند حدوث هذا الحدث...' })}</label>
<select
id="trigger"
value={newWorkflow.trigger}
onChange={(e) => setNewWorkflow(prev => ({ ...prev, trigger: e.target.value }))}
className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
>
<option value="booking.created">booking.created</option>
<option value="complaint.routed">complaint.routed</option>
<option value="chat.answered">chat.answered</option>
</select>
</div>

<div>
<label htmlFor="action" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Perform this action...', ar: 'تنفيذ هذا الإجراء...' })}</label>
<select
id="action"
value={newWorkflow.action}
onChange={(e) => setNewWorkflow(prev => ({ ...prev, action: e.target.value }))}
className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
>
<option value="Send Slack Notification">Send Slack Notification</option>
<option value="Trigger outbound Webhook">Trigger outbound Webhook</option>
<option value="Send Admin Email">Send Admin Email</option>
</select>
</div>
</div>

<button
type="submit"
className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center"
>
{t({ en: 'Add Workflow Rule', ar: 'إضافة قاعدة سير العمل' })}
</button>

</form>

{/* Rules list */}
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
<h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-wider mb-4">{t({ en: 'Active Workflow Rules', ar: 'قواعد سير العمل النشطة' })}</h3>

<div className="divide-y divide-[#141F33]/10">
{workflows.map((w) => (
<div key={w.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 gap-4">
<div className="min-w-0">
<p className="text-xs font-bold text-[#141F33]">{w.name}</p>
<p className="text-[10px] text-slate-500 font-semibold mt-1">
If <strong className="font-mono text-slate-700">{w.trigger}</strong> then <strong className="text-[#2A5CFF]">{w.action}</strong>
</p>
</div>

<div className="flex items-center gap-3 shrink-0">
<label className="relative inline-flex items-center cursor-pointer select-none">
<input
type="checkbox"
checked={w.active}
onChange={() => handleToggle(w.id)}
className="sr-only peer"
/>
<div className="w-9 h-5 bg-[#141F33]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#F8F9FB] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#F8F9FB] after:border-[#141F33]/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141F33]" />
</label>
</div>
</div>
))}
</div>
</div>

</div>
);
}