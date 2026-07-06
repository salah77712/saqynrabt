'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Toast } from '../../../../components/ui/Toast';

export default function SSOPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const [samlEnabled, setSamlEnabled] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = () => {
    setToastMsg(t({en: 'SSO configuration updated.', ar: 'تم تحديث تكوين SSO.'}));
  };

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">{t({en: 'Enterprise Single Sign-On (SSO)', ar: 'تسجيل الدخول الموحد للمؤسسات (SSO)'})}</h1>
          <p className="text-xs text-slate-500 font-bold">{t({en: 'Configure corporate identity integrations (SAML 2.0 / OIDC).', ar: 'تكوين تكاملات الهوية المؤسسية (SAML 2.0 / OIDC).'})}</p>
        </div>
        <Badge variant={samlEnabled ? 'success' : 'primary'}>
          {samlEnabled ? t({en: 'SSO Active', ar: 'SSO نشط'}) : t({en: 'SSO Inactive', ar: 'SSO غير نشط'})}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-base">{t({en: 'SSO Gateway Details', ar: 'تفاصيل بوابة SSO'})}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t({en: 'Integrate SAQYN authentication directly with enterprise credential stores like Okta, Azure AD, or Ping Identity.', ar: 'دمج مصادقة SAQYN مباشرة مع مخازن بيانات الاعتماد المؤسسية مثل Okta أو Azure AD أو Ping Identity.'})}
          </p>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-xs font-bold text-navy dark:text-white">{t({en: 'Enable SAML Authentication', ar: 'تمكين مصادقة SAML'})}</span>
            <input
              type="checkbox"
              checked={samlEnabled}
              onChange={(e) => setSamlEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-royal focus:ring-royal"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">{t({en: 'SAML Metadata XML URL', ar: 'رابط XML بيانات SAML الوصفية'})}</label>
            <Input
              value={metadataUrl}
              onChange={(e) => setMetadataUrl(e.target.value)}
              placeholder="https://identity.yourcorp.com/app/metadata"
            />
          </div>

          <Button variant="primary" className="w-full" onClick={handleSave}>
            {t({en: 'Save SSO Settings', ar: 'حفظ إعدادات SSO'})}
          </Button>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-base">{t({en: 'Metadata Downloads', ar: 'تنزيل البيانات الوصفية'})}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
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
