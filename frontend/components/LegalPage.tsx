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
<div className="min-h-screen bg-surface text-primary font-sans">
<Header />
<main className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
<Link
href="/trust"
className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-wider text-primary/50 hover:text-primary transition-colors mb-12"
>
<span className="transition-transform group-hover:-translate-x-1 duration-150 inline-block">
<ArrowLeft className="w-4 h-4" />
</span>
Back to Trust Center
</Link>
<article className="prose prose-slate max-w-none prose-headings:text-primary prose-headings:font-black prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-a:text-accent prose-strong:text-primary prose-code:text-sm prose-p:text-primary/85 prose-p:leading-relaxed prose-li:text-primary/85 prose-li:leading-relaxed prose-table:text-primary/85 prose-th:text-primary prose-th:font-black prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-td:text-sm prose-td:py-3 prose-tr:border-b prose-tr:border-primary/10 prose-blockquote:border-accent prose-blockquote:text-primary/70 prose-blockquote:font-semibold prose-hr:border-primary/10">
<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
</article>
</main>
<Footer />
</div>
);
}
