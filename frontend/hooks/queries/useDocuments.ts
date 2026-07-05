'use client';

import { useQuery } from '@tanstack/react-query';

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  status: 'ready' | 'processing' | 'failed';
}

export interface DocumentsResponse {
  documents: DocumentItem[];
}

async function fetchDocuments(): Promise<DocumentsResponse> {
  const res = await fetch('/api/documents');
  if (!res.ok) {
    throw new Error('Failed to fetch documents');
  }
  return res.json();
}

export function useDocuments() {
  return useQuery<DocumentsResponse>({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    staleTime: 10_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}
