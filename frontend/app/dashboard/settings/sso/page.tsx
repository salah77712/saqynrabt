'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Toast } from '../../../../components/ui/Toast';

export default function SSOPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [samlEnabled, setSamlEnabled] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = () => {
    setToastMsg(t({en: 'SSO configuration updated.', ar: 'تم تحديث تكوين SSO.'}));
  };

  return (
    <main id="main-content" className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-[#F8F9FB]">{t({en: 'Single Sign-On (SSO)', ar: 'تسجيل الدخول الموحد للمؤسسات (SSO)'})}</h1>
          <p className="text-xs text-[#141F33] font-bold">{t({en: 'Connect your company\'s identity system for one-click login.', ar: 'تكوين تكاملات الهوية المؤسسية (SAML 2.0 / OIDC).'})}</p>
        </div>
        <Badge variant={samlEnabled ? 'success' : 'primary'}>
          {samlEnabled ? t({en: 'SSO Active', ar: 'SSO نشط'}) : t({en: 'SSO Inactive', ar: 'SSO غير نشط'})}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<Card className="p-8 rounded-[40px] space-y-4">
  <h3 className="font-bold text-navy dark:text-[#F8F9FB] text-base">{t({en: 'SSO Gateway Details', ar: 'تفاصيل بوابة SSO'})}</h3>
  <p className="text-xs text-[#141F33] leading-relaxed">
            {t({en: 'Integrate SAQYN authentication directly with enterprise credential stores like Okta, Azure AD, or Ping Identity.', ar: 'دمج مصادقة SAQYN مباشرة مع مخازن بيانات الاعتماد المؤسسية مثل Okta أو Azure AD أو Ping Identity.'})}
          </p>

          <div className="flex items-center justify-between py-2 border-b border-[#141F33]/10">
            <span className="text-xs font-bold text-navy dark:text-[#F8F9FB]">{t({en: 'Enable SAML Authentication', ar: 'تمكين مصادقة SAML'})}</span>
            <input
              type="checkbox"
              checked={samlEnabled}
              onChange={(e) => setSamlEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-[#141F33]/20 text-[#141F33] focus:ring-2 focus:ring-royal"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-[#141F33] uppercase">{t({en: 'SAML Metadata XML URL', ar: 'رابط XML بيانات SAML الوصفية'})}</label>
<Input
        value={metadataUrl}
        onChange={(e) => setMetadataUrl(e.target.value)}
        placeholder="https://identity.yourcorp.com/app/metadata"
        className="min-h-[44px] rounded-[40px] px-4 py-2 text-xs font-semibold"
            />
          </div>

          <Button variant="default" className="w-full py-3 px-6 rounded-[40px] text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={handleSave}>
            {t({en: 'Save SSO Settings', ar: 'حفظ إعدادات SSO'})}
          </Button>
        </Card>

<Card className="p-8 rounded-[40px] space-y-4">
  <h3 className="font-bold text-navy dark:text-[#F8F9FB] text-base">{t({en: 'Metadata Downloads', ar: 'تنزيل البيانات الوصفية'})}</h3>
          <p className="text-xs text-[#141F33] leading-relaxed">
            {t({en: 'To configure SSO in your Identity Provider (IdP) administration portal, download our service provider config properties.', ar: 'لتكوين SSO في بوابة إدارة موفر الهوية (IdP)، قم بتنزيل خصائص تكوين موفر الخدمة لدينا.'})}
          </p>
          <Button variant="outline" className="w-full">
            {t({en: 'Download SAQYN SAML Metadata XML', ar: 'تنزيل بيانات SAML الوصفية لـ SAQYN'})}
          </Button>
        </Card>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </main>
  );
}


