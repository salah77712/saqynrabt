'use client';

import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const cases = [
  {
    industry: '🏨 Hospitality',
    title: '5-Star Doha Hotel Cuts Front-Desk Calls by 60%',
    result: 'Automated late check-ins, room service requests, and complaint routing. Staff now focus on guest experience instead of phone duty.',
    metrics: ['60% fewer front-desk calls', '4.8★ guest satisfaction', '24/7 call coverage'],
  },
  {
    industry: '🏥 Healthcare',
    title: 'Private Clinic in Dubai Handles 2× More Patient Intake',
    result: 'AI answers booking inquiries, triages urgent cases, and routes prescriptions to the pharmacy — all without a receptionist.',
    metrics: ['2× patient intake', 'Zero missed calls', '15-min avg response time'],
  },
  {
    industry: '🔧 Home Services',
    title: 'Kuwait HVAC Company Captures 100% of After-Hours Leads',
    result: 'Emergency calls are answered by AI, dispatch is triggered automatically, and technicians arrive on time every time.',
    metrics: ['100% lead capture', '30-min avg dispatch', '40% revenue increase'],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Case Studies
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          Real Results from Real Businesses
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          From Doha to Dubai to Kuwait — see how teams use SAQYN RABT to transform their operations.
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {cases.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider">{c.industry}</span>
                  <h2 className="text-2xl font-bold text-primary mt-2 mb-3">{c.title}</h2>
                  <p className="text-slate-500 leading-relaxed">{c.result}</p>
                </div>
                <div className="lg:w-64 bg-slate-50 rounded-2xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Metrics</p>
                  <ul className="space-y-2">
                    {c.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm font-medium text-primary">
                        <span className="text-emerald-500">✓</span>{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Be the Next Success Story</h2>
          <p className="text-slate-500 mb-8">Book a demo and see how SAQYN RABT can transform your operations.</p>
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
