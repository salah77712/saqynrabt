'use client';

import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Globe } from 'lucide-react';

const highlights = {
	en: [
		{ stat: '1', label: 'HQ Location (Qatar)' },
		{ stat: 'Remote-First', label: 'Team Model' },
		{ stat: 'Pilot', label: 'Phase' },
		{ stat: '2', label: 'Languages Supported' },
	],
	ar: [
		{ stat: '1', label: 'مقر واحد (قطر)' },
		{ stat: 'عن بعد', label: 'نموذج العمل' },
		{ stat: 'تجريبي', label: 'المرحلة' },
		{ stat: '2', label: 'لغات مدعومة' },
	],
};

const regions = {
	en: [
		{ name: 'Qatar (Headquarters)', flag: 'middleeast', cities: 'Doha', desc: 'Our primary base of operations. All core engineering, product, and customer onboarding is managed from Doha.' },
		{ name: 'Middle East & North Africa', flag: 'europe', cities: 'Remote coverage', desc: 'We serve early customers across the Gulf and Levant region with remote-first support and Arabic/English language capabilities.' },
		{ name: 'Global (Remote)', flag: 'asia', cities: 'Remote team', desc: 'Our team operates remotely across time zones. We are building for a global audience starting with regional focus.' },
	],
	ar: [
		{ name: 'قطر (المقر الرئيسي)', flag: 'middleeast', cities: 'الدوحة', desc: 'قاعدة عملياتنا الأساسية. كل الهندسة الأساسية وتطوير المنتج والتأهيل يتم إدارتها من الدوحة.' },
		{ name: 'الشرق الأوسط وشمال أفريقيا', flag: 'europe', cities: 'تغطية عن بعد', desc: 'نخدم العملاء الأوائل عبر الخليج والمنطقة بدعم عن بعد وقدرات بالعربية والإنجليزية.' },
		{ name: 'عالمي (عن بعد)', flag: 'asia', cities: 'فريق عن بعد', desc: 'يعمل فريقنا عن بعد عبر مناطق زمنية. نبني لجمهور عالمي نبدأ من التركيز الإقليمي.' },
	],
};

const flagIconMap: Record<string, React.ReactNode> = {
	middleeast: <Globe className="w-8 h-8 text-primary" />,
	europe: <Globe className="w-8 h-8 text-primary" />,
	asia: <Globe className="w-8 h-8 text-primary" />,
};

export default function GlobalPage() {
	const { locale } = useLocale();
	const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
	const highlightList = highlights[locale as keyof typeof highlights] || highlights.en;
	const regionList = regions[locale as keyof typeof regions] || regions.en;

	return (
		<div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<Header />

			<section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
				<span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
					{t({ en: 'Global Presence', ar: 'الوجود العالمي' })}
				</span>
				<h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
					{t({ en: 'Qatar-Based. Building for the World.', ar: 'مقرنا قطر. نبني للعالم.' })}
				</h1>
				<p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
					{t({ en: 'We are a remote-first team headquartered in Doha, Qatar, with a regional focus on the Middle East and North Africa.', ar: 'نحن فريق عن بعد مقره الدوحة، قطر، مع تركيز إقليمي على الشرق الأوسط وشمال أفريقيا.' })}
				</p>
			</section>

			<section className="bg-surface py-16">
				<div className="max-w-5xl mx-auto px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{highlightList.map((h) =>
							<div key={h.label} className="text-center bg-background border border-primary/10 rounded-xl p-8 shadow-sm shadow-card">
								<p className="text-2xl md:text-4xl font-extrabold text-primary">{h.stat}</p>
								<p className="text-sm text-primary mt-1">{h.label}</p>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-7xl mx-auto px-6">
					<h2 className="text-xl md:text-3xl font-bold text-primary text-center mb-12">
						{t({ en: 'Where We Operate', ar: 'أين نعمل' })}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regionList.map((r) =>
							<div key={r.name} className="border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
								<span className="text-4xl mb-3 block">{flagIconMap[r.flag] || <Globe className="w-8 h-8 text-primary" />}</span>
								<h3 className="text-xl font-bold text-primary mb-1">{r.name}</h3>
								<p className="text-xs text-primary mb-3">{r.cities}</p>
								<p className="text-sm text-primary leading-relaxed">{r.desc}</p>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className="bg-primary py-16">
				<div className="max-w-3xl mx-auto px-6 text-center text-surface">
					<h2 className="text-xl md:text-3xl font-bold mb-4">
						{t({ en: 'Wherever You Are, We are Ready', ar: 'أينما كنت، نحن جاهزون' })}
					</h2>
					<p className="text-surface mb-8">
						{t({ en: 'From a hotel in Doha to a clinic in the Gulf — your AI operations start here.', ar: 'من فندق في الدوحة إلى عيادة في الخليج — عملياتك الذكية تبدأ هنا.' })}
					</p>
					<a
						href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-surface text-primary px-6 py-3 text-sm font-semibold hover:bg-background transition-all"
					>
						{t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
					</a>
				</div>
			</section>

			<Footer />
		</div>
	);
}
