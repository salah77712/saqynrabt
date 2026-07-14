'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/shadcn/button';
import { Input } from '../ui/Input';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function ChatInterface() {
  const [list, setList] = useState<Message[]>([
    { id: '1', sender: 'assistant', text: "Hi, I'm your team assistant. Ask me anything from your documents." },
  ]);
  const [query, setQuery] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setList((prev) => [...prev, userMsg]);
    setQuery('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Here's what I found in your documents.",
      };
      setList((prev) => [...prev, assistantMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[500px] border border-[#F8F9FB] dark:border-[#141F33] rounded-2xl bg-[#F8F9FB] dark:bg-[#141F33] shadow-sm overflow-hidden">
      {/* List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {list.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-4 text-xs font-semibold leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#141F33] dark:bg-[#2A5CFF] text-[#F8F9FB] rounded-tr-none'
                  : 'bg-[#F8F9FB] dark:bg-[#141F33] border border-[#F8F9FB] dark:border-[#141F33] text-[#141F33] dark:text-[#F8F9FB] rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-none p-4 border border-[#F8F9FB] bg-[#F8F9FB] text-xs text-[#141F33] font-semibold">
              <span className="inline-flex items-center gap-1">
                {[0, 160, 320].map((delay) => (
                  <span
                    key={delay}
                    className="inline-block w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#F8F9FB] dark:border-[#141F33] p-4 flex gap-2 bg-[#F8F9FB] dark:bg-[#141F33]">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <Button variant="default" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatInterface;
