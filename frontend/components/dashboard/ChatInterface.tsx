'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function ChatInterface() {
  const [list, setList] = useState<Message[]>([
    { id: '1', sender: 'assistant', text: 'Hi, I\'m your team assistant. Ask me anything from your documents.' },
  ]);
  const [query, setQuery] = useState('');
  const [typing, setTyping] = useState(false);

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
        text: 'Here\'s what I found in your documents.',
      };
      setList((prev) => [...prev, assistantMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
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
                  ? 'bg-slate-100 dark:bg-slate-800 text-navy dark:text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-none p-4 border border-gray-100 bg-white text-xs text-slate-400 font-semibold animate-pulse">
              AI is writing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-50 dark:border-slate-800 p-4 flex gap-2 bg-slate-50/50 dark:bg-slate-800/20">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <Button variant="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
export default ChatInterface;
