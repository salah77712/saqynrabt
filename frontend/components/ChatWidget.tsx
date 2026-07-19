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

  const [keyboardOffset, setKeyboardOffset] = React.useState(0);
  const [isMobileKeyboard, setIsMobileKeyboard] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.visualViewport) {
        const vp = window.visualViewport;
        const diff = window.innerHeight - vp.height;
        const offset = Math.max(0, diff);
        setKeyboardOffset(offset);
        setIsMobileKeyboard(offset > 0);
      }
    };
    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div
      className="fixed end-4 z-50 font-sans"
      style={{
        bottom: isMobileKeyboard
          ? `calc(env(safe-area-inset-bottom, 0px) + ${keyboardOffset}px + 16px)`
          : undefined,
      }}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
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
        <div className="w-[calc(100vw-24px)] max-w-[380px] max-h-[500px] h-[calc(100vh-180px)] bg-background dark:bg-primary rounded-xl border border-primary/10 dark:border-surface/10 shadow-card flex flex-col overflow-hidden border-t-4 border-t-accent">
          
          {/* Header */}
          <div className="bg-background dark:bg-primary border-b border-primary/10 dark:border-surface/10 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-primary dark:text-surface">Synthetiq Work - HR Bot</h3>
              <p className="text-[10px] text-accent font-bold uppercase tracking-wider mt-0.5">RAG Operations Agent</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-primary/40 dark:text-surface/40 hover:text-primary dark:hover:text-accent transition-colors p-1"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-surface dark:bg-primary space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs font-semibold px-4 py-2.5 rounded-[20px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-surface rounded-te-none'
                      : 'bg-background dark:bg-primary text-primary dark:text-surface border border-primary/5 dark:border-surface/5 rounded-ts-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Citation Pill Badge */}
                  {msg.citation && (
                    <div className="bg-surface dark:bg-primary rounded-full px-3 py-1 text-[10px] font-bold border border-primary/10 dark:border-surface/10 inline-block mt-2 select-none">
                      Cite: {msg.citation}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center gap-1 bg-background dark:bg-primary border border-primary/5 dark:border-surface/5 rounded-[20px] rounded-ts-none px-4 py-2.5 max-w-[80px] shadow-sm">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input Form Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-background dark:bg-primary border-t border-primary/10 dark:border-surface/10 flex items-center gap-3">
            <input
              type="text"
              placeholder={t({ en: 'Ask a policy or PTO question...', ar: 'اطرح سؤالك هنا...' })}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-full px-5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] text-primary dark:text-surface"
              required
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="w-11 h-11 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
