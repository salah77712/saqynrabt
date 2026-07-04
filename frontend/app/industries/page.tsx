'use client';

import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const industries = [
  { icon: '🏨', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties use SAQYN RABT to handle late check-ins, room service requests, and guest complaints 24/7.' },
  { icon: '🏥', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
  { icon: '🔧', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
  { icon: '🏢', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
  { icon: '🚗', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests around the clock.' },
  { icon: '🍽️', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
  { icon: '🚨', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
  { icon: '🐈', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
  { icon: '💧', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
  { icon: '🛎️', title: 'Boutique Hotels', desc: 'Let guests auto-assign digital door codes at midnight. Handle late arrivals without front-desk staff.' },
  { icon: '🍷', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
  { icon: '🏁', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot — even after hours.' },
  { icon: '🏗️', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
  { icon: '⚖️', title: 'Law Firms', desc: 'Auto-answer retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
  { icon: '📈', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
  { icon: '🛒', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
];

export default function IndustriesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Industries
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          Built for 16 Industries — Worldwide
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Based in Qatar, serving the globe. Our platform adapts to your industry, language, and time zone.
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <span className="text-3xl mb-3 block">{ind.icon}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{ind.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Don&apos;t see your industry?</h2>
          <p className="text-slate-500 mb-8">SAQYN RABT is industry-agnostic. We build custom workflows for any business type.</p>
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
