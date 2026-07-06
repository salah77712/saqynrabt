'use client';

import { useQuery } from '@tanstack/react-query';

export interface UsageData {
  automation_texts_used: number;
  automation_texts_limit: number;
  voice_minutes_used: number;
  voice_minutes_limit: number;
  questions_used: number;
  questions_limit: number;
  employees_used: number;
  employees_limit: number;
}

async function fetchUsage(): Promise<UsageData> {
  const res = await fetch('/api/usage');
  if (!res.ok) {
    throw new Error('Failed to fetch usage data');
  }
  try { return await res.json(); } catch (e) { console.error("Invalid JSON response", e); throw new Error("Invalid JSON response"); }
}

export function useUsage(enabled = true) {
  return useQuery<UsageData>({
    queryKey: ['usage'],
    queryFn: fetchUsage,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 2,
    enabled,
  });
}
