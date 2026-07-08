import type { Metadata } from 'next';

const site = {
  name: 'SAQYN RABT',
  url: 'https://saqynrabt.com',
  defaultTitle: 'SAQYN RABT | Intelligent Staff Hub & Queue Automation',
  defaultDescription: 'Secure AI-powered automation for guest intake, staff knowledge, and business operations.',
  defaultImage: '/og-image.png',
};

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
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
    },
    keywords: options.keywords || ['SAQYN RABT', 'AI automation', 'RAG chatbot', 'guest queue', 'staff knowledge'],
    robots: {
      index: true,
      follow: true,
    },
  };
}
