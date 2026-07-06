'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '../../../components/Footer';
import { MarketingHeader } from '../../../components/MarketingHeader';

const chatbotTiers = [
  {
    id: 'chat-starter',
    title: 'Starter',
    subtitle: 'Up to 50 employees.',
    price: '2,999',
    setup: '4,999',
    popular: false,
    features: ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
  },
  {
    id: 'chat-growth',
    title: 'Growth',
    subtitle: 'Up to 150 employees.',
    price: '4,999',
    setup: '6,999',
    popular: true,
    features: ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
  },
  {
    id: 'chat-enterprise',
    title: 'Enterprise',
    subtitle: '151+ employees.',
    price: 'Custom',
    setup: 'Custom',
    popular: false,
    features: ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
    ctaContact: true,
  },
];

const capabilities = [
  { icon: '📄', title: 'PDF & Document Upload', desc: 'Upload your HR handbook, SOPs, and policies. The AI learns from them instantly.' },
  { icon: '🔍', title: 'RAG-Powered Q&A', desc: 'Employees ask questions in plain language, the AI finds the exact answer from your documents.' },
  { icon: '🕵️', title: 'Knowledge Gap Tracking', desc: 'See every question the AI couldn\'t answer — so you know exactly what documents to add.' },
  { icon: '🔐', title: 'Private & Isolated', desc: 'Your data never trains the model. It\'s locked to your company\'s knowledge base only.' },
  { icon: '👤', title: 'Employee Login & Roles', desc: 'Each employee has their own login. Admins manage access and document permissions.' },
  { icon: '📈', title: 'Onboarding Accelerator', desc: 'New hires get instant answers to standard onboarding questions on day one.' },
];

const faqs = [
  {
    q: 'Is our company data private?',
    a: 'Absolutely. Your documents are stored in your isolated, encrypted knowledge base. The AI model is never trained on your data. Your SOPs and HR policies are never shared with any third party.',
  },
  {
    q: 'How many employees can we onboard?',
    a: 'The Starter plan supports up to 50 employees, Growth up to 150, and Enterprise is unlimited. You can upgrade at any time mid-cycle without losing any data or configurations.',
  },
  {
    q: 'What document formats are supported?',
    a: 'We currently support PDF, DOCX, and plain text files. Our team processes your documents during the setup phase and updates them whenever you send new versions.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most clients are live within 5–7 business days. The setup fee covers document processing, role configuration, employee seat provisioning, and your onboarding walkthrough call.',
  },
];

function FAQItem({ q, a, open: defaultOpen }: { q: string; a: string; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
      >
        <span className="font-bold text-sm text-[#141F33] pr-4">{q}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#718096] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm text-[#718096] leading-relaxed animate-slideDown">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ChatbotPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 animate-fadeIn">
            Internal Company Chatbot
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#141F33] leading-tight max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Your Company Knowledge. Instantly Accessible by Your Team.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#718096] max-w-2xl mx-auto leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            A private RAG-powered AI trained only on your HR policies, SOPs, and onboarding documents. Your employees get answers, not chatbots.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm px-8 py-4"
            >
              Book a Demo
            </button>
            <Link href="/#pricing" className="btn-secondary text-sm px-8 py-4">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-white border-y border-gray-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-8">What your team can do with it</h2>
              <div className="flex flex-col gap-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.title}
                    className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm card-hover animate-slideUp"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{cap.icon}</span>
                    <div>
                      <p className="font-extrabold text-slate-800 text-sm">{cap.title}</p>
                      <p className="text-[#718096] text-xs mt-0.5 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 flex flex-col gap-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[#141F33] font-black text-base">Company Assistant</span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 rounded-full px-3 py-1">🔒 Private</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="self-end bg-[#141F33] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  How many vacation days do I have left?
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  Based on your profile, you have <strong>14 days</strong> remaining this cycle. Your next accrual of 2.5 days is on August 1st.
                </div>
                <div className="self-end bg-[#141F33] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  What&apos;s the SOP for reporting a maintenance issue?
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  According to <em>Operations Manual v3.2</em>, submit a ticket via the portal under <strong>Facilities → Maintenance</strong>. Urgent issues can be escalated directly to your floor supervisor.
                </div>
                <div className="self-start bg-slate-50 border border-dashed border-gray-200 text-slate-400 text-xs px-4 py-2.5 rounded-2xl max-w-[85%] italic">
                  Sourced from: HR Handbook &amp; Operations Manual
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link href="/dashboard/chat" className="text-xs text-[#141F33] font-bold hover:underline">
                  View Full Chat Dashboard Demo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-3">Chatbot Pricing</h2>
            <p className="text-[#718096] font-medium">All plans include private RAG setup, employee provisioning, and your dedicated dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chatbotTiers.map((tier, i) => (
              <div
                key={tier.id}
                className="relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm card-hover flex flex-col animate-slideUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-[#141F33]">{tier.title}</h3>
                <p className="text-xs text-[#718096] font-medium mt-0.5 mb-4">{tier.subtitle}</p>
                <div className="mb-1">
                  {tier.price !== 'Custom' ? (
                    <>
                      <span className="text-4xl font-extrabold text-[#141F33]">{tier.price}</span>
                      <span className="text-[#718096] text-sm font-bold ml-1">QAR / mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-[#141F33]">Custom</span>
                  )}
                </div>
                <p className="text-[#10B981] font-bold text-sm mb-5">
                  {tier.setup !== 'Custom' ? `+ ${tier.setup} QAR setup fee` : 'Custom setup fee'}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                      <span className="text-[#10B981] font-bold text-base leading-none">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all min-h-[44px] ${
                    tier.ctaContact
                      ? 'border border-gray-200 bg-white text-[#141F33] hover:bg-gray-50 hover:scale-[1.02] active:scale-95'
                      : 'bg-[#141F33] text-white hover:scale-[1.02] hover:shadow-lg active:scale-95'
                  }`}
                >
                  {tier.ctaContact ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-gray-100 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
                <FAQItem q={faq.q} a={faq.a} open={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-extrabold text-[#141F33] mb-2">Book a Demo</h3>
            <p className="text-sm font-medium text-[#718096] mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your private knowledge base.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Book a Demo
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-ghost text-sm"
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
