'use client';

import React, { useState, useCallback } from 'react';
import { useLocale } from '../../providers';
import { useGlobalToast } from '../../../lib/toast';
import { DocumentGrid } from '../../../components/dashboard/DocumentGrid';
import { Card } from '@/components/shadcn/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/shadcn/dialog';
import { Button } from '@/components/shadcn/button';
import { Input } from '../../../components/ui/Input';
import { Skeleton, SkeletonCard } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry, EmptyDocumentsState } from '../../../components/ui/EmptyState';
import { Folder } from 'lucide-react';
import { useDocuments } from '../../../hooks/queries/useDocuments';

export default function DocumentsDashboardPage() {
const { locale } = useLocale();
const { addToast } = useGlobalToast();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;
const { data, isLoading, isError, error, refetch } = useDocuments();

const [searchQuery, setSearchQuery] = useState('');
const [uploading, setUploading] = useState(false);
const fileInputRef = React.useRef<HTMLInputElement>(null);

const documents = data?.documents ?? [];

const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

const handleDelete = useCallback((id: string) => {
setDeleteTargetId(id);
}, []);

const confirmDelete = useCallback(async () => {
if (!deleteTargetId) return;
try {
await fetch(`/api/documents?id=${deleteTargetId}`, { method: 'DELETE' });
refetch();
} catch (err) {
console.error('Delete failed:', err);
refetch();
} finally {
setDeleteTargetId(null);
}
}, [deleteTargetId, refetch]);

const handleFileUpload = useCallback(async (file: File) => {
if (!file) return;
if (file.type !== 'application/pdf') {
addToast(t('Only PDF documents are allowed.', 'ÙŠØ³Ù…Ø­ Ø¨Ù…Ù„ÙØ§Øª PDF ÙÙ‚Ø·.'), 'warning');
return;
}

setUploading(true);
const formData = new FormData();
formData.append('file', file);

try {
await fetch('/api/documents', { method: 'POST', body: formData });
refetch();
} catch (err) {
console.error('Upload failed:', err);
} finally {
setUploading(false);
}
}, [refetch, t]);

  const filteredDocs = documents.filter((doc) => {
    return doc.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  });

if (isLoading) {
return (
<div className="space-y-6 md:space-y-8 animate-fadeIn">
<div className="animate-pulse">
<div className="h-8 bg-primary dark:bg-primary rounded-lg w-72 mb-2" />
<div className="h-4 bg-primary dark:bg-primary rounded-lg w-96" />
</div>
<Skeleton variant="rectangular" className="h-48 w-full" />
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{[1, 2, 3].map((i) => (
<SkeletonCard key={i} />
))}
</div>
</div>
);
}

if (isError) {
return (
<EmptyStateWithRetry
message={error?.message || t('Failed to load documents.', 'ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª.')}
onRetry={() => refetch()}
/>
);
}

return (
<div className="space-y-6 md:space-y-8 animate-fadeIn">
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
{t('Document Library', 'Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„Ø®Ø§ØµØ©')}
</h1>
<p className="text-xs md:text-xs text-primary font-bold">
{t('Upload PDFs so your AI can answer questions from your policies and manuals.', 'ØªØ­Ù…ÙŠÙ„ ÙˆÙÙ‡Ø±Ø³Ø© Ù…Ù„ÙØ§Øª PDF Ù„ØªÙˆØ³ÙŠØ¹ Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ.')}
</p>
</div>

<div className="w-full md:max-w-xs">
<Input
placeholder={t('Search documents...', 'Ø§Ù„Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª...')}
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="min-h-[44px] text-xs md:text-sm"
/>
</div>
</div>

<label className="block">
      <div className="border-2 border-dashed border-primary/10 rounded-xl p-8 bg-surface flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:border-primary group relative overflow-hidden cursor-pointer">
        <Folder className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:scale-110 transition-transform mb-3 md:mb-4" />
        <h3 className="text-xs md:text-sm font-extrabold text-primary">
          {t('Tap to upload PDFs', 'Ø§Ø¶ØºØ· Ù„Ø±ÙØ¹ Ù…Ù„ÙØ§Øª PDF')}
        </h3>
        <p className="text-xs md:text-xs text-primary font-medium mt-1">
          {t('PDF up to 10MB', 'PDF Ø­ØªÙ‰ 10 Ù…ÙŠØ¬Ø§Ø¨Ø§ÙŠØª')}
        </p>

        <div className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 mt-3 md:mt-5 bg-primary hover:opacity-95 text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] inline-flex items-center justify-center">
{t('Browse Files', 'ØªØµÙØ­ Ø§Ù„Ù…Ù„ÙØ§Øª')}
</div>
<input
ref={fileInputRef}
type="file"
accept=".pdf"
className="absolute inset-0 opacity-0 cursor-pointer"
onChange={(e) => {
if (e.target.files && e.target.files[0]) {
handleFileUpload(e.target.files[0]);
if (fileInputRef.current) fileInputRef.current.value = '';
}
}}
/>

{uploading && (
<div className="absolute inset-0 bg-surface backdrop-blur-sm flex items-center justify-center">
<span className="h-6 w-6 md:h-8 md:w-8 rounded-full border-3 border-primary/10 border-t-primary animate-spin" />
</div>
)}
</div>
</label>

{filteredDocs.length === 0 && !isLoading ? (
<EmptyDocumentsState onUpload={() => fileInputRef.current?.click()} />
) : (
<DocumentGrid docs={filteredDocs} onDelete={handleDelete} />
)}

<Dialog open={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
<DialogContent className="sm:max-w-md bg-surface border border-primary/10 shadow-2xl rounded-xl p-8">
<DialogHeader>
<DialogTitle className="text-lg font-extrabold text-primary">
{t('Delete Document', 'Ø­Ø°Ù Ø§Ù„Ù…Ø³ØªÙ†Ø¯')}
</DialogTitle>
<DialogDescription className="text-xs text-primary font-medium mt-2">
{t('Are you sure you want to delete this document? This action cannot be undone.', 'Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø±ØºØ¨ØªÙƒ ÙÙŠ Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ù…Ø³ØªÙ†Ø¯ØŸ Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„ØªØ±Ø§Ø¬Ø¹ Ø¹Ù† Ù‡Ø°Ø§ Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡.')}
</DialogDescription>
</DialogHeader>
<div className="flex items-center justify-end gap-4 mt-6">
<Button
variant="ghost"
onClick={() => setDeleteTargetId(null)}
className="min-h-[44px] rounded-xl text-xs font-bold px-6 border-primary/10 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{t('Cancel', 'Ø¥Ù„ØºØ§Ø¡')}
</Button>
<Button
variant="danger"
onClick={confirmDelete}
className="min-h-[44px] rounded-xl text-xs font-bold px-6 bg-primary hover:bg-primary text-surface transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{t('Delete', 'Ø­Ø°Ù')}
</Button>
</div>
</DialogContent>
</Dialog>
</div>
);
}