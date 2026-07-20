'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; direction: 'up' | 'down'; label?: string };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, trend, icon, className = '' }: MetricCardProps) {
  return (
    <div className={`relative bg-surface border border-primary/10 rounded-xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-primary/60">{label}</p>
        {icon && <span className="text-primary/40">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-primary">{value}</p>
      {trend && (
        <div className="flex items-center gap-1.5 mt-2">
          {trend.direction === 'up' ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-danger" />
          )}
          <span className={`text-xs font-bold ${trend.direction === 'up' ? 'text-success' : 'text-danger'}`}>
            {trend.value}%
          </span>
          {trend.label && (
            <span className="text-xs text-primary/40">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
