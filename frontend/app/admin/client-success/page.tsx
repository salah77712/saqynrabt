'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { HealthScore } from '../../../components/HealthScore';

interface ClientItem {
  id: string;
  name: string;
  score: number;
  status: 'active' | 'churn_risk';
  usage: string;
}

export default function ClientSuccessPage() {
  const clients: ClientItem[] = [
    { id: '1', name: 'Qatar Medical Center', score: 94, status: 'active', usage: '82% quota' },
    { id: '2', name: 'Doha Service Workshop', score: 78, status: 'active', usage: '45% quota' },
    { id: '3', name: 'Al-Sadd Retail Mall', score: 45, status: 'churn_risk', usage: '10% quota' },
  ];

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Customer Success Console</h1>
          <p className="text-xs text-slate-500 font-bold">Monitor account health indexes and retention risks.</p>
        </div>
        <Badge variant="warning">3 Accounts Need Attention</Badge>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <Card key={client.id} className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-navy dark:text-white text-base">{client.name}</h4>
              <p className="text-xs text-slate-400 mt-1">Resource consumption: {client.usage}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <HealthScore score={client.score} />
              <Badge variant={client.status === 'active' ? 'success' : 'danger'}>
                {client.status === 'active' ? 'Healthy' : 'Retention Warning'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
