'use client';

import { useQuery } from '@tanstack/react-query';

export interface AutomationRequest {
  id: string;
  type: string;
  customer: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed';
}

export interface AutomationResponse {
  requests: AutomationRequest[];
  activeCalls: {
    id: string;
    caller: string;
    timestamp: string;
    transcript: string[];
  }[];
}

async function fetchAutomationRequests(): Promise<AutomationResponse> {
  const res = await fetch('/api/automation');
  if (!res.ok) {
    throw new Error('Failed to fetch automation requests');
  }
  return res.json();
}

export function useAutomationRequests() {
  return useQuery<AutomationResponse>({
    queryKey: ['automation-requests'],
    queryFn: fetchAutomationRequests,
    staleTime: 60_000,
    refetchInterval: 10_000,
    retry: 2,
  });
}
