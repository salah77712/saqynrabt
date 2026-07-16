'use client';

import * as React from 'react';
import { useLocale } from '../app/providers';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citation?: string | null;
}

export function ChatWidget() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: '1', sender: 'assistant', text: 'Welcome! I am Synthetiq Work, your HR assistant. Ask me anything about PTO balances or policies.' },
  ]);
  const [inputText, setInputText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat container
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/saas/sessions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.text,
          tenantId: 'demo-tenant-id', // fallback fallback for demo/admin testing
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: data.text || 'Sorry, I could not generate an answer.',
            citation: data.citation,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'An error occurred while calling the chatbot API.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Network connection failed. Try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-accent hover:bg-accent/90 text-white p-4 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 min-h-[48px] min-w-[48px]"
          aria-label="Open HR Assistant Chatbot"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* Chat Tray */}
      {isOpen && (
        <div className="w-[380px] h-[500px] bg-white dark:bg-[#141F33] rounded-xl border border-[#141F33]/10 dark:border-[#F8F9FB]/10 shadow-card flex flex-col overflow-hidden border-t-4 border-t-[#1A3BCC]">
          
          {/* Header */}
          <div className="bg-white dark:bg-[#141F33] border-b border-[#141F33]/10 dark:border-[#F8F9FB]/10 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#141F33] dark:text-[#F8F9FB]">Synthetiq Work - HR Bot</h3>
              <p className="text-[10px] text-[#1A3BCC] font-bold uppercase tracking-wider mt-0.5">RAG Operations Agent</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#141F33]/40 dark:text-[#F8F9FB]/40 hover:text-[#141F33] dark:hover:text-[#2A5CFF] transition-colors p-1"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FB] dark:bg-[#141F33] space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs font-semibold px-4 py-2.5 rounded-[20px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#141F33] text-[#F8F9FB] rounded-tr-none'
                      : 'bg-white dark:bg-[#141F33] text-[#141F33] dark:text-[#F8F9FB] border border-[#141F33]/5 dark:border-[#F8F9FB]/5 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Citation Pill Badge */}
                  {msg.citation && (
                    <div className="bg-[#F8F9FB] dark:bg-[#141F33] rounded-full px-3 py-1 text-[10px] font-bold border border-[#141F33]/10 dark:border-[#F8F9FB]/10 inline-block mt-2 select-none">
                      Cite: {msg.citation}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center gap-1 bg-white dark:bg-[#141F33] border border-[#141F33]/5 dark:border-[#F8F9FB]/5 rounded-[20px] rounded-tl-none px-4 py-2.5 max-w-[80px] shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#141F33]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#141F33]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#141F33]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input Form Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-[#141F33] border-t border-[#141F33]/10 dark:border-[#F8F9FB]/10 flex items-center gap-3">
            <input
              type="text"
              placeholder={t({ en: 'Ask a policy or PTO question...', ar: 'اسأل عن السياسات أو الإجازات...' })}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#F8F9FB]/10 rounded-full px-5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2A5CFF] min-h-[44px] text-[#141F33] dark:text-[#F8F9FB]"
              required
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="w-11 h-11 rounded-full bg-[#1A3BCC] hover:bg-[#1A3BCC]/90 text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
