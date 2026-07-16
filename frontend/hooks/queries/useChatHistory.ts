'use client';

import { useQuery } from '@tanstack/react-query';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
}

async function fetchChatHistory(): Promise<ChatHistoryResponse> {
  const res = await fetch('/api/chat/history');
  if (!res.ok) {
    throw new Error('Failed to fetch chat history');
  }
  try { return await res.json(); } catch (e) { console.error("Invalid JSON response", e); throw new Error("Invalid JSON response"); }
}

export function useChatHistory() {
  return useQuery<ChatHistoryResponse>({
    queryKey: ['chat-history'],
    queryFn: fetchChatHistory,
    staleTime: 30_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}
