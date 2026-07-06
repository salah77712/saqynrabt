'use client';

import { useQuery } from '@tanstack/react-query';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

export interface TeamResponse {
  pending: TeamMember[];
  active: TeamMember[];
}

async function fetchTeamMembers(): Promise<TeamResponse> {
  const res = await fetch('/api/approvals');
  if (!res.ok) {
    throw new Error('Failed to fetch team members');
  }
  try { return await res.json(); } catch (e) { console.error("Invalid JSON response", e); throw new Error("Invalid JSON response"); }
}

export function usePendingApprovals() {
  return useQuery<TeamResponse>({
    queryKey: ['team-members'],
    queryFn: fetchTeamMembers,
    staleTime: 10_000,
    refetchInterval: 20_000,
    retry: 2,
  });
}
