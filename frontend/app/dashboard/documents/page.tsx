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
addToast(t('Only PDF documents are allowed.', 'يسمح بملفات PDF فقط.'), 'warning');
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
<div className="h-8 bg-[#141F33]/10 dark:bg-[#141F33] rounded-lg w-72 mb-2" />
<div className="h-4 bg-[#141F33]/10 dark:bg-[#141F33] rounded-lg w-96" />
</div>
<Skeleton variant="rectangular" className="h-48 w-full" />
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
message={error?.message || t('Failed to load documents.', 'فشل تحميل المستندات.')}
onRetry={() => refetch()}
/>
);
}

return (
<div className="space-y-6 md:space-y-8 animate-fadeIn">
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
<div>
<h1 className="text-xl md:text-2xl font-black text-[#141F33] dark:text-[#F8F9FB] tracking-tight">
{t('Document Library', 'مستندات المعرفة الخاصة')}
</h1>
<p className="text-[10px] md:text-xs text-[#141F33] font-bold">
{t('Upload PDFs so your AI can answer questions from your policies and manuals.', 'تحميل وفهرسة ملفات PDF لتوسيع معرفة المساعد الذكي.')}
</p>
</div>

<div className="w-full md:max-w-xs">
<Input
placeholder={t('Search documents...', 'البحث في المستندات...')}
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="min-h-[44px] text-xs md:text-sm"
/>
</div>
</div>

<label className="block">
      <div className="border-2 border-dashed border-[#141F33]/10 rounded-2xl p-6 bg-[#F8F9FB] flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:border-[#141F33] group relative overflow-hidden cursor-pointer">
        <Folder className="w-8 h-8 md:w-10 md:h-10 text-[#141F33] group-hover:scale-110 transition-transform mb-2 md:mb-4" />
        <h3 className="text-xs md:text-sm font-extrabold text-[#141F33]">
          {t('Tap to upload PDFs', 'اضغط لرفع ملفات PDF')}
        </h3>
        <p className="text-[10px] md:text-xs text-[#141F33] font-medium mt-1">
          {t('PDF up to 10MB', 'PDF حتى 10 ميجابايت')}
        </p>

        <div className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 mt-3 md:mt-5 bg-[#141F33] hover:opacity-95 text-[#F8F9FB] font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] inline-flex items-center justify-center">
{t('Browse Files', 'تصفح الملفات')}
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
<div className="absolute inset-0 bg-[#F8F9FB]/80 backdrop-blur-sm flex items-center justify-center">
<span className="h-6 w-6 md:h-8 md:w-8 rounded-full border-3 border-[#141F33]/10 border-t-[#141F33] animate-spin" />
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
<DialogContent className="sm:max-w-md bg-[#F8F9FB] border border-[#141F33]/10 shadow-2xl rounded-2xl p-6">
<DialogHeader>
<DialogTitle className="text-lg font-extrabold text-[#141F33]">
{t('Delete Document', 'حذف المستند')}
</DialogTitle>
<DialogDescription className="text-xs text-[#141F33] font-medium mt-2">
{t('Are you sure you want to delete this document? This action cannot be undone.', 'هل أنت متأكد من رغبتك في حذف هذا المستند؟ لا يمكن التراجع عن هذا الإجراء.')}
</DialogDescription>
</DialogHeader>
<div className="flex items-center justify-end gap-3 mt-6">
<Button
variant="outline"
onClick={() => setDeleteTargetId(null)}
className="min-h-[44px] rounded-xl text-xs font-bold px-6 border-[#141F33]/10 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{t('Cancel', 'إلغاء')}
</Button>
<Button
variant="destructive"
onClick={confirmDelete}
className="min-h-[44px] rounded-xl text-xs font-bold px-6 bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{t('Delete', 'حذف')}
</Button>
</div>
</DialogContent>
</Dialog>
</div>
);
}