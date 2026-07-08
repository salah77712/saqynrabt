import type { Metadata } from 'next';

// ── Site-wide constants ────────────────────────────────────
export const site = {
  name: 'SAQYN RABT',
  url: 'https://saqynrabt.com',
  defaultTitle: 'SAQYN RABT | Intelligent Staff Hub & Queue Automation',
  defaultDescription:
    'Secure AI-powered automation for guest intake, staff knowledge, and business operations across Qatar and the Middle East.',
  defaultImage: '/og-image.png',
  twitterHandle: '@saqynrabt',
  locale: 'en_US',
};

// ── Page metadata generator ────────────────────────────────
export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${options.path}`;
  const image = `${site.url}${options.imagePath ?? '/og-image'}`;

  return {
    title: `${options.title} | ${site.name}`,
    description: options.description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${options.title} | ${site.name}`,
      description: options.description,
      url,
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${options.title} | ${site.name}`,
      description: options.description,
      images: [image],
      creator: site.twitterHandle,
    },
    keywords: options.keywords || [
      'SAQYN RABT',
      'AI automation',
      'RAG chatbot',
      'guest queue',
      'staff knowledge',
      'Qatar SaaS',
      'Middle East B2B',
    ],
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// ── JSON-LD Schema Generators ──────────────────────────────

/** Organization schema for the homepage */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon-512x512.png`,
    description: site.defaultDescription,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@saqynrabt.com',
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

/** WebSite schema with search action */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/help?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** SoftwareApplication schema */
export function softwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: site.defaultDescription,
    offers: {
      '@type': 'Offer',
      price: '1499',
      priceCurrency: 'QAR',
      priceValidUntil: '2027-12-31',
    },
  };
}

/** BreadcrumbList schema generator */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQ page schema */
export function faqSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/** Helper to render JSON-LD as a script tag string */
export function jsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
