'use client';

import React from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../../components/ui/Badge';

export default function IntegrationsSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const integrations = [
    { id: 'slack', name: 'Slack Workspace', desc: t({en: 'Sync alert channels.', ar: 'مزامنة قنوات التنبيهات.'}), active: true },
    { id: 'teams', name: 'Microsoft Teams', desc: t({en: 'Sync incident tickets.', ar: 'مزامنة تذاكر الحوادث.'}), active: false },
    { id: 'zapier', name: 'Zapier Webhooks', desc: t({en: 'Trigger outgoing automations.', ar: 'تشغيل الأتمتة الصادرة.'}), active: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {integrations.map((int) => (
        <Card key={int.id} className="flex flex-col justify-between p-8">
          <div>
            <div className="flex justify-between items-start gap-8 mb-2">
              <h4 className="font-bold text-navy dark:text-[#F8F9FB] text-sm">{int.name}</h4>
              <Badge variant={int.active ? 'success' : 'primary'}>
                {int.active ? t({en: 'Connected', ar: 'متصل'}) : t({en: 'Configure', ar: 'تكوين'})}
              </Badge>
            </div>
            <p className="text-[10px] text-[#141F33] mt-1 leading-relaxed">
              {int.desc}
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px]">
            {int.active ? t({en: 'Manage', ar: 'إدارة'}) : t({en: 'Connect API', ar: 'ربط API'})}
          </Button>
        </Card>
      ))}
    </div>
  );
}


