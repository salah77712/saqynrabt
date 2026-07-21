'use client';

import React from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../../components/ui/Badge';

export default function SecuritySettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <Card className="p-8 rounded-xl space-y-4 max-w-xl">
      <h3 className="font-bold text-navy dark:text-surface text-base">{t({en: 'Security', ar: 'سياسات أمان الحساب'})}</h3>
      <p className="text-xs text-primary leading-relaxed">
        {t({en: 'Manage login security, devices, and two-factor authentication.', ar: 'التحقق من إعدادات التحقق من الهوية وسجلات الأجهزة وتكوينات المصادقة الثنائية.'})}
      </p>

      <div className="flex justify-between items-center py-2 border-b border-primary/10">
        <div>
          <p className="text-xs font-bold text-navy dark:text-surface">{t({en: 'Multi-Factor Authentication (MFA)', ar: 'المصادقة متعددة العوامل (MFA)'})}</p>
          <p className="text-xs text-primary mt-0.5">{t({en: 'Protect logins via standard SMS/TOTP codes.', ar: 'حماية تسجيلات الدخول عبر رموز SMS/TOTP القياسية.'})}</p>
        </div>
        <Badge variant="primary">{t({en: 'Active', ar: 'نشط'})}</Badge>
      </div>

      <Button variant="ghost" className="w-full">
        {t({en: 'Reset Workspace Password', ar: 'إعادة تعيين كلمة مرور مساحة العمل'})}
      </Button>
    </Card>
  );
}


