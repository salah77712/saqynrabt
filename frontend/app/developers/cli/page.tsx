'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersCliDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const commands = [
    { cmd: 'saqyn login', desc: t({ en: 'Authenticate CLI with your Clerk developer account credentials.', fr: 'Authentifier le CLI avec les identifiants de votre compte dÃ©veloppeur Clerk.', ar: 'تسجيل الدخول للمطور باستخدام بيانات Clerk.', hi: 'à¤à¤ªà¤¨à¥ à¤à¥à¤²à¤°à¥à¤ à¤¡à¥à¤µà¤²à¤ªà¤° à¤à¤¾à¤¤à¤¾ à¤à¥à¤°à¥à¤¡à¥à¤à¤¶à¤¿à¤¯à¤² à¤à¥ à¤¸à¤¾à¤¥ à¤¸à¥à¤à¤²à¤à¤ à¤à¥ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤à¤°à¥à¤à¥¤' }) },
    { cmd: 'saqyn chat "Is early checkout allowed?"', desc: t({ en: 'Send a prompt query and retrieve streaming RAG answers directly.', fr: 'Envoyer une requÃªte et rÃ©cupÃ©rer directement les rÃ©ponses RAG en streaming.', ar: 'إرسال سؤال واستلام إجابة المساعد الذكي فوريًا.', hi: 'à¤à¤ à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤­à¥à¤à¥à¤ à¤à¤° à¤¸à¥à¤§à¥ à¤¸à¥à¤à¥à¤°à¥à¤®à¤¿à¤à¤ à¤à¤°à¤à¤à¥ à¤à¤¤à¥à¤¤à¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤à¤°à¥à¤à¥¤' }) },
    { cmd: 'saqyn upload handbook.pdf', desc: t({ en: 'Upload and index a PDF file into the vector knowledge base.', fr: 'TÃ©lÃ©charger et indexer un fichier PDF dans la base de connaissances vectorielle.', ar: 'تحميل وفهرسة ملف PDF في قاعدة المعرفة.', hi: 'à¤µà¥à¤à¥à¤à¤° à¤à¥à¤à¤¾à¤¨ à¤à¤§à¤¾à¤° à¤®à¥à¤ à¤à¤ à¤ªà¥à¤¡à¥à¤à¤« à¤«à¤¾à¤à¤² à¤à¤ªà¤²à¥à¤¡ à¤à¤° à¤à¤à¤¡à¥à¤à¥à¤¸ à¤à¤°à¥à¤à¥¤' }) },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Command-Line Tools', fr: 'Outils en ligne de commande', ar: 'أدوات واجهة الأوامر CLI', hi: 'à¤à¤®à¤¾à¤à¤¡-à¤²à¤¾à¤à¤¨ à¤à¤ªà¤à¤°à¤£' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Official SAQYN CLI Guide', fr: 'Guide officiel du CLI SAQYN', ar: 'دليل أداة CLI الرسمية لـ SAQYN', hi: 'à¤à¤§à¤¿à¤à¤¾à¤°à¤¿à¤ SAQYN CLI à¤à¤¾à¤à¤¡' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Manage documents, index files, and run chat integrations directly from your terminal.', fr: 'GÃ©rez les documents, indexez les fichiers et exÃ©cutez les intÃ©grations de chat directement depuis votre terminal.', ar: 'إدارة المستندات، وفهرسة الملفات، وتشغيل محادثات المساعد مباشرة من التيرمينال.', hi: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥à¤à¤¼ à¤ªà¥à¤°à¤¬à¤à¤§à¤¿à¤¤ à¤à¤°à¥à¤, à¤«à¤¼à¤¾à¤à¤²à¥à¤ à¤à¤¨à¥à¤à¥à¤°à¤®à¤¿à¤¤ à¤à¤°à¥à¤, à¤à¤° à¤¸à¥à¤§à¥ à¤à¤ªà¤¨à¥ à¤à¤°à¥à¤®à¤¿à¤¨à¤² à¤¸à¥ à¤à¥à¤ à¤à¤à¥à¤à¤°à¤£ à¤à¤²à¤¾à¤à¤à¥¤' })}
          </p>
        </div>

        {/* CLI Steps */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-primary">{t({ en: 'Core CLI Command Reference', fr: 'RÃ©fÃ©rence des commandes CLI principales', ar: 'مرجع أوامر CLI الأساسية', hi: 'à¤®à¥à¤à¥à¤¯ à¤¸à¥à¤à¤²à¤à¤ à¤à¤®à¤¾à¤à¤¡ à¤¸à¤à¤¦à¤°à¥à¤­' })}</h3>

          <div className="space-y-4">
            {commands.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-primary/10 bg-surface space-y-2">
                <code className="text-xs font-mono font-bold text-accent">{c.cmd}</code>
                <p className="text-[11px] font-semibold text-primary leading-normal">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
