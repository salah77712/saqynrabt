'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    a: 'Absolutely. Your documents are stored in your isolated, encrypted knowledge base on Pinecone. The AI model is never trained on your data. Your SOPs and HR policies are never shared with any third party.',
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

export default function ChatbotPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-white text-[#111111] min-h-screen flex flex-col font-sans">

      {/* Navbar */}
      <header className="sticky top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#1A365D] font-bold text-xl tracking-wider hover:opacity-80 transition-opacity">
            SAQYN RABT
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/automation" className="hover:text-[#1A365D] transition-colors">Automation</Link>
            <Link href="/chatbot" className="text-[#1A365D] font-semibold border-b-2 border-[#1A365D] pb-0.5">Chatbot</Link>
            <Link href="/#pricing" className="hover:text-[#1A365D] transition-colors">Pricing</Link>
            <Link href="/dashboard" className="hover:text-[#1A365D] transition-colors">Dashboard Demo</Link>
          </nav>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center bg-[#1A365D] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all text-sm"
          >
            Book a Demo
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Internal Company Chatbot
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1A365D] leading-tight max-w-4xl mx-auto">
          Your Company Knowledge. Instantly Accessible by Your Team.
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          A private RAG-powered AI trained only on your HR policies, SOPs, and onboarding documents. Your employees get answers, not chatbots.
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

            {/* Left — Capabilities */}
            <div>
              <h2 className="text-3xl font-bold text-[#1A365D] mb-8">What your team can do with it</h2>
              <div className="grid grid-cols-1 gap-4">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                    <span className="text-2xl mt-0.5">{cap.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{cap.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Chat Interface Mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[#1A365D] font-bold text-base">Company Assistant</span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 rounded-full px-3 py-1">🔒 Private</span>
              </div>

              {/* Chat bubbles */}
              <div className="flex flex-col gap-3">
                <div className="self-end bg-[#1A365D] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  How many vacation days do I have left?
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  Based on your profile, you have <strong>14 days</strong> remaining this cycle. Your next accrual of 2.5 days is on August 1st.
                </div>
                <div className="self-end bg-[#1A365D] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  What's the SOP for reporting a maintenance issue?
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  According to <em>Operations Manual v3.2</em>, submit a ticket via the portal under <strong>Facilities → Maintenance</strong>. Urgent issues can be escalated directly to your floor supervisor.
                </div>
                <div className="self-start bg-slate-50 border border-dashed border-gray-200 text-gray-400 text-xs px-4 py-2.5 rounded-2xl max-w-[85%] italic">
                  Sourced from: HR Handbook & Operations Manual
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link href="/dashboard/chat" className="text-xs text-[#1A365D] font-semibold hover:underline">View Full Chat Dashboard Demo →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-3">Chatbot Pricing</h2>
            <p className="text-gray-500">All plans include private RAG setup, employee provisioning, and your dedicated dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chatbotTiers.map((tier) => (
              <div key={tier.id} className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">⭐ Popular</span>
                )}
                <h3 className="text-xl font-bold text-[#1A365D]">{tier.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 mb-4">{tier.subtitle}</p>
                <div className="mb-1">
                  {tier.price !== 'Custom' ? (
                    <>
                      <span className="text-4xl font-extrabold text-[#1A365D]">{tier.price}</span>
                      <span className="text-gray-400 text-sm ml-1">QAR / mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-[#1A365D]">Custom</span>
                  )}
                </div>
                <p className="text-green-600 font-medium text-sm mb-5">
                  {tier.setup !== 'Custom' ? `+ ${tier.setup} QAR setup fee` : 'Custom setup fee'}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="text-green-500 font-bold text-base leading-none">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    tier.ctaContact
                      ? 'bg-gray-100 text-[#1A365D] hover:bg-gray-200'
                      : 'bg-[#1A365D] text-white hover:opacity-90'
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
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400 mt-auto">
        <div className="flex items-center justify-center gap-6 mb-3 text-sm">
          <Link href="/automation" className="hover:text-[#1A365D] transition-colors">← Business Automation</Link>
          <Link href="/" className="text-[#1A365D] font-semibold hover:underline">Back to Home</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} SAQYN RABT. All rights reserved.</p>
      </footer>

      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#1A365D] mb-2">Book a Demo — Internal Chatbot</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your private knowledge base.
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
