'use client';

import React, { useState } from 'react';
import { Card } from '@/components/shadcn/card';
import { Badge } from './ui/Badge';
import { Check } from 'lucide-react';

export function OnboardingChecklist() {
const [tasks, setTasks] = useState([
{ id: '1', label: 'Verify business details', done: true },
{ id: '2', label: 'Upload first PDF knowledge document', done: false },
{ id: '3', label: 'Enable SSO single sign-on parameters', done: false },
]);

const completed = tasks.filter((t) => t.done).length;

return (
<Card className="max-w-md w-full border border-[#141F33]/10">
<div className="flex justify-between items-center border-b border-[#141F33]/10 pb-3 mb-3">
<h4 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-sm">Getting Started</h4>
<Badge variant={completed === tasks.length ? 'success' : 'primary'}>
{completed} / {tasks.length} {completed === tasks.length ? 'Ready' : 'Pending'}
</Badge>
</div>

<ul className="space-y-2">
{tasks.map((task) => (
<li key={task.id} className="flex items-center gap-2 text-xs">
<span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
task.done ? 'bg-[#2A5CFF] border-[#2A5CFF] text-white' : 'border-[#141F33]/30'
}`}>
{task.done ? <Check className="w-4 h-4 text-[#2A5CFF]" /> : ''}
</span>
<span className={`font-semibold ${task.done ? 'line-through text-[#141F33]/40' : 'text-[#141F33] dark:text-[#141F33]/70'}`}>
{task.label}
</span>
</li>
))}
</ul>
</Card>
);
}
export default OnboardingChecklist;
