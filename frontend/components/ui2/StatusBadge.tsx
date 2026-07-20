'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'inactive' | 'error' | 'success' | 'warning';
  label?: string;
  className?: string;
}

const statusConfig = {
  active: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  success: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  pending: { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
  inactive: { bg: 'bg-muted/10', text: 'text-muted', dot: 'bg-muted' },
  error: { bg: 'bg-danger/10', text: 'text-danger', dot: 'bg-danger' },
};

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {label || status}
    </span>
  );
}
