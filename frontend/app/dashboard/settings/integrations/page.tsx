'use client';

import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';

export default function IntegrationsSettingsPage() {
  const integrations = [
    { id: 'slack', name: 'Slack Workspace', desc: 'Sync alert channels.', active: true },
    { id: 'teams', name: 'Microsoft Teams', desc: 'Sync incident tickets.', active: false },
    { id: 'zapier', name: 'Zapier Webhooks', desc: 'Trigger outgoing automations.', active: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {integrations.map((int) => (
        <Card key={int.id} className="flex flex-col justify-between p-6">
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h4 className="font-bold text-navy dark:text-white text-sm">{int.name}</h4>
              <Badge variant={int.active ? 'success' : 'primary'}>
                {int.active ? 'Connected' : 'Configure'}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
              {int.desc}
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full">
            {int.active ? 'Manage' : 'Connect API'}
          </Button>
        </Card>
      ))}
    </div>
  );
}
