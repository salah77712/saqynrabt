'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '../../../components/Footer';
import { MarketingHeader } from '../../../components/MarketingHeader';

const automationTiers = [
  {
    id: 'auto-starter',
    title: 'Starter',
    subtitle: 'For small front desks.',
    price: '1,499',
    setup: '1,999',
    popular: false,
    features: ['Basic call answering', '500 text requests/mo', '250 voice mins/mo', '1 department routing', 'Standard support'],
  },
  {
    id: 'auto-growth',
    title: 'Growth',
    subtitle: 'For growing operations.',
    price: '2,499',
    setup: '3,499',
    popular: true,
    features: ['Advanced call answering', '2,000 text requests/mo', '700 voice mins/mo', '3 dept routing', 'Complaint routing', 'Weekly report'],
  },
  {
    id: 'auto-pro',
    title: 'Professional',
    subtitle: 'For multi-department teams.',
    price: '4,499',
    setup: '5,999',
    popular: false,
    features: ['Advanced call answering', '5,000 text requests/mo', '1,500 voice mins/mo', '8 dept routing', 'Manager alerts', 'Priority support', '2 languages'],
  },
];

const useCases = [
  { icon: '📞', title: 'Call Answering 24/7', desc: 'AI answers every incoming call, even at 3 AM, with natural voice.' },
  { icon: '💬', title: 'WhatsApp & SMS Parsing', desc: 'Automatically reads and categorises inbound messages from any channel.' },
  { icon: '🚨', title: 'Complaint Routing', desc: 'Flags urgent issues and routes them to the correct manager instantly.' },
  { icon: '📋', title: 'Booking Capture', desc: 'Captures reservations, orders, and appointments without human input.' },
  { icon: '📊', title: 'Live Transcripts', desc: 'Every call logged in real-time on your dashboard for full audit trail.' },
  { icon: '🌐', title: 'Multi-Language Support', desc: 'Handles Arabic and English simultaneously across all channels.' },
];

const faqs = [
  {
    q: 'What counts as a text request?',
    a: 'A text request is any inbound message received through your website chat widget, WhatsApp integration, contact form, or SMS number. Every message sent by a customer = 1 request.',
  },
  {
    q: 'Does this work for my hotel or clinic?',
    a: 'Yes. SAQYN RABT is industry-agnostic by design. We have templates pre-built for hospitality, healthcare, automotive, real estate, and 11 other sectors. Your onboarding call sets up the correct routing rules for your specific team.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most clients are live within 5 business days after the onboarding call. The setup fee covers our team configuring your department routing, voice scripts, and dashboard integrations.',
  },
  {
    q: 'Can I change my plan later?',
    a: 'Yes, you can upgrade at any time mid-cycle. Downgrades take effect at the next billing date. Contact our team to adjust.',
  },
];

export default function AutomationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">

      <MarketingHeader />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-blue-50 text-[#1A365D] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Business Automation
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1A365D] leading-tight max-w-4xl mx-auto">
          Never Miss a Customer Call, Booking, or Complaint Again.
        </h1>
        <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The 24/7 AI front-desk that handles external inquiries, routes requests, and streamlines your guest experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1A365D] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all text-base"
          >
            Book a Demo
          </button>
          <Link href="/#pricing" className="border-2 border-gray-200 text-[#1A365D] px-8 py-4 rounded-lg font-semibold hover:border-[#1A365D] transition-all text-base">
            View Pricing
          </Link>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left — Use Cases */}
            <div>
              <h2 className="text-3xl font-bold text-[#1A365D] mb-8">What it handles for you</h2>
              <div className="grid grid-cols-1 gap-4">
                {useCases.map((uc) => (
                  <div key={uc.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                    <span className="text-2xl mt-0.5">{uc.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{uc.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard Mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[#1A365D] font-bold text-base">Live Queue</span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 rounded-full px-3 py-1">● Live</span>
              </div>
              {[
                { label: 'Incoming Call — Room 204 noise complaint', dept: 'Housekeeping', status: 'Routed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                { label: 'WhatsApp — Late checkout request (2:30 PM)', dept: 'Front Desk', status: 'Approved', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'SMS — Airport transfer booking (07:00 tomorrow)', dept: 'Concierge', status: 'Captured', color: 'bg-violet-50 text-violet-700 border-violet-200' },
                { label: 'Web Chat — Spa appointment request', dept: 'Wellness', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.dept}</p>
                  </div>
                  <span className={`text-xs font-semibold border rounded-full px-3 py-1 whitespace-nowrap ml-3 ${item.color}`}>{item.status}</span>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Link href="/dashboard/automation" className="text-xs text-[#1A365D] font-semibold hover:underline">View Full Dashboard Demo →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-3">Automation Pricing</h2>
            <p className="text-slate-500">All plans include onboarding support and your dedicated dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {automationTiers.map((tier) => (
              <div key={tier.id} className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">⭐ Popular</span>
                )}
                <h3 className="text-xl font-bold text-[#1A365D]">{tier.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-4">{tier.subtitle}</p>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-[#1A365D]">{tier.price}</span>
                  <span className="text-slate-400 text-sm ml-1">QAR / mo</span>
                </div>
                <p className="text-green-600 font-medium text-sm mb-5">+ {tier.setup} QAR setup fee</p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="text-green-500 font-bold text-base leading-none">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#1A365D] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <p className="font-semibold text-slate-800 mb-2">{faq.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#1A365D] mb-2">Book a Demo — Business Automation</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your automation workspace.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#1A365D] text-white font-bold rounded-full transition-colors"
                style={{ minHeight: '44px' }}
              >
                Book a Demo
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
                style={{ minHeight: '44px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
