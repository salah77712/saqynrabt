import * as React from 'react';
import Link from 'next/link';
import { CheckIcon, ArrowRightIcon } from '../../../components/ui/Icons';

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

const ShieldSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const FileTextSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);

const LockSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

const HandshakeSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
);

const BadgeCheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const DownloadSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

const iconMap: Record<string, () => React.ReactNode> = {
  filetext: FileTextSvg,
  shield: ShieldSvg,
  lock: LockSvg,
  handshake: HandshakeSvg,
  badgecheck: BadgeCheckSvg,
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
              const Icon = iconMap[card.icon] || ShieldSvg;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#141F33]/5 flex items-center justify-center">
                      <Icon />
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
                            {b.status === 'in-progress' ? <span className="inline-block w-2.5 h-2.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-1" /> : <CheckIcon className="w-2.5 h-2.5 text-green-700 inline mr-0.5" />}
                            {b.label}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#141F33] bg-[#141F33]/5 px-4 py-2.5 rounded-xl hover:bg-[#141F33]/10 transition-colors"
                      >
                        <DownloadSvg />
                        {card.actionLabel}
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={card.href!}
                      className="inline-flex items-center text-xs font-bold text-[#2A5CFF] hover:text-[#141F33] transition-colors"
                    >
                      Read Full {card.title} <ArrowRightIcon className="w-3 h-3 inline" />
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
              className="inline-flex items-center gap-2 bg-[#141F33] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#141F33]/90 transition-colors"
            >
              Contact DPO: dpo@saqynrabt.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
