import * as React from 'react';
import Link from 'next/link';
import { Shield, FileText, Lock, Handshake, BadgeCheck, Download, Check, ArrowRight } from 'lucide-react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { pageMetadata } from '../../../lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'Trust Center — SAQYN RABT',
  description: 'Real-time system status, compliance certifications, and security docs.',
  path: '/trust',
  keywords: ['trust center', 'system status', 'compliance'],
});

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
    href: '/legal/privacy',
    badge: 'Qatar Law No. 13 of 2016',
  },
  {
    icon: 'shield',
    title: 'Terms of Service',
    description: 'Binding contract governing your use of our services.',
    href: '/terms-and-conditions',
    badge: 'Terms of Service',
  },
  {
    icon: 'lock',
    title: 'Data Processing Agreement',
    description: 'Safeguards for processing personal data on your behalf.',
    href: '/legal/dpa',
    badge: 'GDPR Art. 28',
  },
  {
icon: 'shield',
title: 'Security Architecture',
description: 'Technical measures to protect your data (encryption, access control, multi-tenancy).',
href: '/legal/security',
    badge: 'AES-256 + TLS 1.3',
  },
  {
icon: 'handshake',
title: 'Non-Disclosure Agreement',
description: 'Mutual protection for confidential business information.',
href: '/legal/nda',
    badge: 'Mutual NDA',
  },
  {
    icon: 'badgecheck',
    title: 'Security Practices',
    description: 'We follow industry-standard security practices including encryption at rest and in transit, access controls, and regular audits of our infrastructure.',
    badges: [
      { label: 'AES-256 Encryption', status: 'active' },
      { label: 'TLS 1.3', status: 'active' },
      { label: 'Access Controls', status: 'active' },
    ],
  },
];

export default function TrustPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-surface selection:bg-accent selection:text-surface">
      <Header />

      <section className="bg-primary text-surface py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your Data, Our Responsibility.
          </h1>
          <p className="mt-4 text-lg text-surface/70 max-w-2xl mx-auto">
            We take data protection and security seriously.
          </p>
          <p className="mt-3 text-sm text-surface/50 max-w-2xl mx-auto">
            SAQYN RABT is committed to protecting your data. We follow industry best practices for security and privacy, and we are transparent about our current posture.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustCards.map((card, i) => {
              return (
                <div
                  key={i}
                  className="rounded-xl border border-primary/10 bg-surface p-8 flex flex-col gap-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      {iconMap[card.icon] || <Shield className="w-5 h-5" />}
                    </div>
                    {card.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider text-accent bg-surface px-2 py-1 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-primary">{card.title}</h3>
                    <p className="mt-1 text-sm text-primary/60">{card.description}</p>
                  </div>

                  {card.badges ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-3">
                        {card.badges.map((b, j) => (
                          <span
                            key={j}
                            className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-surface text-accent"
                          >
                            <Check className="w-2.5 h-2.5 text-accent inline me-0.5" />
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={card.href!}
                      className="inline-flex items-center text-xs font-bold text-accent hover:text-primary transition-all hover:scale-[1.01]"
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

      <section className="py-16 px-6 bg-surface">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-primary">Need More Information?</h2>
          <p className="mt-3 text-sm text-primary/60">
            Our DPO is available to answer any compliance or security questions.
          </p>
          <div className="mt-6 flex items-center justify-center gap-8">
            <a
              href="mailto:dpo@saqynrabt.com"
              className="inline-flex items-center gap-3 bg-primary text-surface text-sm font-bold px-6 py-3 rounded-xl hover:bg-primary transition-all hover:scale-[1.01] hover:shadow-md min-h-[44px]"
            >
              Contact DPO: dpo@saqynrabt.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
