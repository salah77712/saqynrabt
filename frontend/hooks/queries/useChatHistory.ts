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
  return res.json();
}

export function useChatHistory() {
  return useQuery<ChatHistoryResponse>({
    queryKey: ['chat-history'],
    queryFn: fetchChatHistory,
    staleTime: 30_000,
    retry: 2,
  });
}
