'use client';

import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const highlights = [
  { stat: '16+', label: 'Industries Served' },
  { stat: '4', label: 'Continents' },
  { stat: '24/7', label: 'Global Support' },
  { stat: '3', label: 'Data Regions' },
];

const regions = [
  { name: 'Middle East', flag: '🇶🇦', cities: 'Doha, Dubai, Riyadh, Kuwait City, Muscat, Manama', desc: 'Our home base. Deep understanding of regional hospitality, healthcare, and service industry needs.' },
  { name: 'Europe', flag: '🇪🇺', cities: 'London, Berlin, Paris, Amsterdam, Madrid', desc: 'GDPR-compliant data hosting. Serving hotels, clinics, and service businesses across the EU.' },
  { name: 'Asia', flag: '🌏', cities: 'Singapore, Tokyo, Dubai, Mumbai, Bangkok', desc: 'Fast-growing presence in Southeast Asia and the subcontinent. Multi-language support included.' },
  { name: 'Africa', flag: '🌍', cities: 'Cairo, Nairobi, Cape Town, Lagos, Casablanca', desc: 'Expanding across the continent with Arabic, English, and French language support.' },
  { name: 'Americas', flag: '🌎', cities: 'New York, Toronto, São Paulo, Mexico City', desc: 'US-East and US-West data regions available. Serving clients from Canada to Brazil.' },
];

export default function GlobalPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Global Presence
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          Based in Qatar. Serving the World.
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Headquartered in Doha, we bring enterprise AI operations to businesses across every continent.
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div key={h.label} className="text-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-primary">{h.stat}</p>
                <p className="text-sm text-slate-500 mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Where We Operate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((r) => (
              <div key={r.name} className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <span className="text-4xl mb-3 block">{r.flag}</span>
                <h3 className="text-xl font-bold text-primary mb-1">{r.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{r.cities}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Wherever You Are, We&apos;re Ready</h2>
          <p className="text-blue-100 mb-8">From a 5-star hotel in Doha to a clinic in Nairobi — your AI operations start here.</p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-all"
          >
            Book a Demo
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
