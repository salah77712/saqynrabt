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
<Card className="max-w-md w-full border border-primary/10">
<div className="flex justify-between items-center border-b border-primary/10 pb-3 mb-3">
<h4 className="font-bold text-primary dark:text-surface text-sm">Getting Started</h4>
<Badge variant={completed === tasks.length ? 'success' : 'primary'}>
{completed} / {tasks.length} {completed === tasks.length ? 'Ready' : 'Pending'}
</Badge>
</div>

<ul className="space-y-2">
{tasks.map((task) => (
<li key={task.id} className="flex items-center gap-3 text-xs">
<span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
task.done ? 'bg-accent border-accent text-surface' : 'border-primary/30'
}`}>
{task.done ? <Check className="w-4 h-4 text-accent" /> : ''}
</span>
<span className={`font-semibold ${task.done ? 'line-through text-primary/40' : 'text-primary dark:text-primary/70'}`}>
{task.label}
</span>
</li>
))}
</ul>
</Card>
);
}
export default OnboardingChecklist;
