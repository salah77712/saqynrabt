import * as React from 'react';
import Link from 'next/link';
import { Shield, FileText, Lock, Handshake, BadgeCheck, Download, Check, ArrowRight } from 'lucide-react';

interface Badge {
  label: string;
  status: 'active' | 'in-progress';
}

interface TrustCard {
  icon: string;
  title: string;
  description: string;
  href?: string;
  badge?: string;
  badges?: Badge[];
  actionLabel?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  filetext: <FileText className="w-5 h-5" />,
  lock: <Lock className="w-5 h-5" />,
  handshake: <Handshake className="w-5 h-5" />,
  badgecheck: <BadgeCheck className="w-5 h-5" />,
};

const trustCards: TrustCard[] = [
  {
    icon: 'filetext',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information.',
    href: '/privacy-policy',
    badge: 'GDPR & Global Privacy',
  },
  {
    icon: 'shield',
    title: 'Terms of Service',
    description: 'Binding contract governing your use of our services.',
    href: '/terms-and-conditions',
    badge: 'Global Terms of Service',
  },
  {
    icon: 'lock',
    title: 'Data Processing Agreement',
    description: 'Safeguards for processing personal data on your behalf.',
    href: '/privacy-policy',
    badge: 'GDPR Art. 28',
  },
  {
    icon: 'shield',
    title: 'Security Architecture',
    description: 'Technical measures to protect your data (encryption, access control, multi-tenancy).',
    href: '/privacy-policy',
    badge: 'AES-256 + TLS 1.3',
  },
  {
    icon: 'handshake',
    title: 'Non-Disclosure Agreement',
    description: 'Mutual protection for confidential business information.',
    href: '/privacy-policy',
    badge: 'Mutual NDA',
  },
  {
    icon: 'badgecheck',
    title: 'Certifications & Audits',
    description: 'Our ongoing compliance with international security and privacy standards.',
    badges: [
      { label: 'ISO 27001', status: 'in-progress' },
      { label: 'SOC 2', status: 'in-progress' },
      { label: 'Global Data Protection Registered', status: 'active' },
    ],
    actionLabel: 'Download Compliance Pack',
  },
];

export default function TrustPage() {
  return (
    <>
      <section className="bg-[#141F33] text-white py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your Data, Our Responsibility.
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Built for Global Operations.
          </p>
          <p className="mt-2 text-sm text-white/50 max-w-2xl mx-auto">
            SAQYN RABT is committed to the highest standards of data protection, security, and
            transparency, in full compliance with global data protection regulations and frameworks.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustCards.map((card, i) => {
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#141F33]/5 flex items-center justify-center">
                      {iconMap[card.icon] || <Shield className="w-5 h-5" />}
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A5CFF] bg-blue-50 px-2 py-1 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#141F33]">{card.title}</h3>
                    <p className="mt-1 text-sm text-[#718096]">{card.description}</p>
                  </div>

                  {card.badges ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {card.badges.map((b, j) => (
                          <span
                            key={j}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                              b.status === 'active'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {b.status === 'in-progress' ? <span className="inline-block w-2.5 h-2.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-1" /> : <Check className="w-2.5 h-2.5 text-green-700 inline mr-0.5" />}
                            {b.label}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#141F33] bg-[#141F33]/5 px-4 py-2.5 rounded-xl hover:bg-[#141F33]/10 transition-all hover:scale-[1.01] hover:shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        {card.actionLabel}
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={card.href!}
                      className="inline-flex items-center text-xs font-bold text-[#2A5CFF] hover:text-[#141F33] transition-all hover:scale-[1.01]"
                    >
                      Read Full {card.title} <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[#141F33]">Need More Information?</h2>
          <p className="mt-2 text-sm text-[#718096]">
            Our DPO is available to answer any compliance or security questions.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="mailto:dpo@saqynrabt.com"
              className="inline-flex items-center gap-2 bg-[#141F33] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#141F33]/90 transition-all hover:scale-[1.01] hover:shadow-md"
            >
              Contact DPO: dpo@saqynrabt.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
