'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from './Header';
import { Footer } from './Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LegalPage({ title, content }: { title: string; content: string }) {
return (
<div className="min-h-screen bg-[#F8F9FB] text-[#141F33] font-sans">
<Header />
<main className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
<Link
href="/trust"
className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#141F33]/50 hover:text-[#141F33] transition-colors mb-12"
>
<span className="transition-transform group-hover:-translate-x-1 duration-150 inline-block">
<ArrowLeft className="w-4 h-4" />
</span>
Back to Trust Center
</Link>
<article className="prose prose-slate max-w-none prose-headings:text-[#141F33] prose-headings:font-black prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-a:text-[#2A5CFF] prose-strong:text-[#141F33] prose-code:text-sm">
<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
</article>
</main>
<Footer />
</div>
);
}
