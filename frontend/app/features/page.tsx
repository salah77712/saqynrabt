'use client';

import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const features = [
  {
    icon: '📞',
    title: 'Call Answering 24/7',
    desc: 'AI answers every incoming call with natural voice, even at 3 AM. Captures bookings, routes complaints, and logs transcripts — zero human effort.',
  },
  {
    icon: '💬',
    title: 'Multi-Channel Intake',
    desc: 'Parse inbound messages from WhatsApp, SMS, web chat, and contact forms. Every channel, one unified dashboard.',
  },
  {
    icon: '🧠',
    title: 'Private RAG Knowledge Base',
    desc: 'Upload HR handbooks, SOPs, and policies. Your team gets instant answers from your documents — never generic AI guesses.',
  },
  {
    icon: '🚨',
    title: 'Smart Complaint Routing',
    desc: 'Flags urgent issues by keyword and routes them to the right manager instantly. No ticket gets lost.',
  },
  {
    icon: '📋',
    title: 'Booking & Appointment Capture',
    desc: 'Reservations, orders, and appointments captured automatically without human input. Syncs with your calendar.',
  },
  {
    icon: '📊',
    title: 'Live Dashboard & Analytics',
    desc: 'Every call, message, and query logged in real time. See team performance, busiest hours, and knowledge gaps.',
  },
  {
    icon: '🌐',
    title: 'Multi-Language Support',
    desc: 'Handles Arabic, English, and more simultaneously across all channels. Your global team speaks their language.',
  },
  {
    icon: '🔐',
    title: 'Enterprise-Grade Security',
    desc: 'Your data never trains the model. Isolated knowledge base, encrypted storage, and role-based access control.',
  },
  {
    icon: '👤',
    title: 'Employee Login & Roles',
    desc: 'Each employee has their own login. Admins control document access, department routing, and permissions.',
  },
  {
    icon: '📈',
    title: 'Onboarding Accelerator',
    desc: 'New hires get instant answers to standard questions on day one. Reduces training time by up to 40%.',
  },
  {
    icon: '🔧',
    title: 'Custom Workflows',
    desc: 'Multi-location businesses, custom routing trees, CRM integrations, and bespoke knowledge bases built to your specs.',
  },
  {
    icon: '🎯',
    title: 'Knowledge Gap Tracking',
    desc: 'See every question the AI could not answer. Know exactly which documents to add to close the gaps.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Features
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          Everything Your Team Needs to Operate at Full Speed
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          From call answering to knowledge management — one platform for your entire operation.
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to see it in action?</h2>
          <p className="text-slate-500 mb-8">Book a 15-minute demo tailored to your industry and team size.</p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Book a Demo
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
