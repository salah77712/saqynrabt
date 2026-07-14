'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersCliDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const commands = [
    { cmd: 'saqyn login', desc: t({ en: 'Authenticate CLI with your Clerk developer account credentials.', fr: 'Authentifier le CLI avec les identifiants de votre compte développeur Clerk.', ar: 'تسجيل الدخول للمطور باستخدام بيانات Clerk.', hi: 'अपने क्लर्क डेवलपर खाता क्रेडेंशियल के साथ सीएलआई को प्रमाणित करें।' }) },
    { cmd: 'saqyn chat "Is early checkout allowed?"', desc: t({ en: 'Send a prompt query and retrieve streaming RAG answers directly.', fr: 'Envoyer une requête et récupérer directement les réponses RAG en streaming.', ar: 'إرسال سؤال واستلام إجابة المساعد الذكي فوريًا.', hi: 'एक त्वरित प्रश्न भेजें और सीधे स्ट्रीमिंग आरएजी उत्तर प्राप्त करें।' }) },
    { cmd: 'saqyn upload handbook.pdf', desc: t({ en: 'Upload and index a PDF file into the vector knowledge base.', fr: 'Télécharger et indexer un fichier PDF dans la base de connaissances vectorielle.', ar: 'تحميل وفهرسة ملف PDF في قاعدة المعرفة.', hi: 'वेक्टर ज्ञान आधार में एक पीडीएफ फाइल अपलोड और इंडेक्स करें।' }) },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Command-Line Tools', fr: 'Outils en ligne de commande', ar: 'أدوات واجهة الأوامر CLI', hi: 'कमांड-लाइन उपकरण' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Official SAQYN CLI Guide', fr: 'Guide officiel du CLI SAQYN', ar: 'دليل أداة CLI الرسمية لـ SAQYN', hi: 'आधिकारिक SAQYN CLI गाइड' })}
          </h1>
          <p className="text-xs font-semibold text-[#141F33] mt-2">
            {t({ en: 'Manage documents, index files, and run chat integrations directly from your terminal.', fr: 'Gérez les documents, indexez les fichiers et exécutez les intégrations de chat directement depuis votre terminal.', ar: 'إدارة المستندات، وفهرسة الملفات، وتشغيل محادثات المساعد مباشرة من التيرمينال.', hi: 'दस्तावेज़ प्रबंधित करें, फ़ाइलें अनुक्रमित करें, और सीधे अपने टर्मिनल से चैट एकीकरण चलाएं।' })}
          </p>
        </div>

        {/* CLI Steps */}
        <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Core CLI Command Reference', fr: 'Référence des commandes CLI principales', ar: 'مرجع أوامر CLI الأساسية', hi: 'मुख्य सीएलआई कमांड संदर्भ' })}</h3>

          <div className="space-y-4">
            {commands.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#141F33]/10 bg-[#F8F9FB] space-y-2">
                <code className="text-xs font-mono font-bold text-[#2A5CFF]">{c.cmd}</code>
                <p className="text-[11px] font-semibold text-[#141F33] leading-normal">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
