'use client';

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { CheckIcon } from './ui/Icons';

export function OnboardingChecklist() {
  const [tasks, setTasks] = useState([
    { id: '1', label: 'Verify business details', done: true },
    { id: '2', label: 'Upload first PDF knowledge document', done: false },
    { id: '3', label: 'Enable SSO single sign-on parameters', done: false },
  ]);

  const completed = tasks.filter((t) => t.done).length;

  return (
    <Card className="max-w-md w-full border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
        <h4 className="font-bold text-navy dark:text-white text-sm">Getting Started</h4>
        <Badge variant={completed === tasks.length ? 'success' : 'primary'}>
          {completed} / {tasks.length} {completed === tasks.length ? 'Ready' : 'Pending'}
        </Badge>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2 text-xs">
            <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
              task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
            }`}>
              {task.done ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : ''}
            </span>
            <span className={`font-semibold ${task.done ? 'line-through text-slate-400' : 'text-navy dark:text-slate-300'}`}>
              {task.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
export default OnboardingChecklist;
