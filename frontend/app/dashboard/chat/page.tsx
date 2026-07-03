'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { useAuth } from '@clerk/nextjs';
import { useEntitlements } from '../../providers';

export default function ChatPage() {
  const { getToken, userId } = useAuth();
  const { entitlements, refreshEntitlements, mockMode } = useEntitlements();
  const [token, setToken] = useState<string>('');
  
  // Custom states for modal and limit simulation (Rule 38 / 18)
  const [limitReached, setLimitReached] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  // Fetch Clerk Auth Token
  useEffect(() => {
    if (mockMode) {
      setToken('mock-token-dummy_company-user_admin12345demo-admin');
      setIsLoadingToken(false);
      return;
    }
    
    getToken().then((tk) => {
      if (tk) setToken(tk);
      setIsLoadingToken(false);
    }).catch(err => {
      console.warn("Auth token fallback to mock:", err.message);
      setToken('mock-token-dummy_company-user_admin12345demo-admin');
      setIsLoadingToken(false);
    });
  }, [getToken, mockMode]);

  // Set up useChat hook from Vercel AI SDK (Rule 23)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/chat`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      company_id: 'dummy_company',
    },
    onResponse: (response) => {
      // Rule 22: intercept 429 Hard Stop
      if (response.status === 429) {
        setLimitReached(true);
      }
      refreshEntitlements();
    },
    onError: (err) => {
      console.error("Chat error:", err);
      // Fallback: if we hit a CORS lock or direct 429, trigger banner
      if (err.message.includes('429') || err.message.includes('LIMIT_REACHED')) {
        setLimitReached(true);
      }
    }
  });

  // Handle mock responses in Sandbox mode for local demos (Rule 30)
  const [sandboxMessages, setSandboxMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([
    { id: '1', role: 'assistant', content: 'Welcome to the Staff Knowledge Hub. I can verify hotel guidelines, policy FAQs, or your employee vacation balance.' }
  ]);
  const [sandboxInput, setSandboxInput] = useState('');

  const handleSandboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxInput.trim() || limitReached) return;

    const userText = sandboxInput;
    const userMsg = { id: String(Date.now()), role: 'user' as const, content: userText };
    setSandboxMessages(prev => [...prev, userMsg]);
    setSandboxInput('');

    // Simulate RAG Response matching database rules
    setTimeout(() => {
      let reply = '';
      if (/vacation|leave|balance/i.test(userText)) {
        // Rule 21 tool emulation
        reply = 'According to your profile in the database, you have 28 days of vacation balance remaining for the current fiscal cycle.';
      } else if (/hours|time/i.test(userText)) {
        reply = 'Office hours are Sunday through Thursday, 8:00 AM to 5:00 PM. Housekeeping shifts operate in 8-hour blocks.';
      } else if (/policy/i.test(userText)) {
        reply = 'Accrued vacation: 2.5 days per month (up to 30 days annually). Approvals must go through the Admin panel.';
      } else {
        // Rule 19/40 Gap simulation
        reply = "I could not find the answer in your company's knowledge base.";
      }
      
      setSandboxMessages(prev => [...prev, { id: String(Date.now() + 1), role: 'assistant', content: reply }]);
    }, 800);
  };

  const activeMessages = mockMode ? sandboxMessages : messages;
  const activeInput = mockMode ? sandboxInput : input;
  const activeSubmit = mockMode ? handleSandboxSubmit : handleSubmit;
  const activeChange = mockMode ? ((e: any) => setSandboxInput(e.target.value)) : handleInputChange;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] relative bg-dark-900 border border-dark-700 rounded-xl overflow-hidden shadow-xl">
      
      {/* 429 Limit Banner (Rule 38) */}
      {limitReached && (
        <div className="bg-red-950 border-b border-red-500/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
          <p className="text-sm font-semibold text-red-300 text-center sm:text-left">
            Your team has reached the monthly question limit. To keep the conversation going, please click &apos;Upgrade Plan&apos;.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm shrink-0"
            style={{ minHeight: '44px' }}
          >
            Upgrade Plan
          </button>
        </div>
      )}

      {/* Header controls for Sandbox */}
      <div className="bg-dark-800 border-b border-dark-700 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-slate-300">Staff Knowledge Hub</span>
        </div>
        
        {/* Simulator controls to demonstrate all Rule requirements */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLimitReached(!limitReached)}
            className={`px-3 py-1 text-xs rounded border transition-colors ${
              limitReached ? 'bg-red-950/60 text-red-400 border-red-500/30' : 'bg-dark-700 text-slate-400 border-dark-600 hover:text-white'
            }`}
          >
            {limitReached ? 'Unlock 429 Lock' : 'Simulate 429 Hard Stop'}
          </button>
        </div>
      </div>

      {/* Messages Output Stream */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4">
        {activeMessages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] rounded-xl p-4 text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-brand-500 text-dark-900 font-medium'
                : 'bg-dark-800 border border-dark-700 text-slate-100'
            }`}>
              <div className="font-bold text-[10px] uppercase tracking-wider mb-1 opacity-70">
                {m.role === 'user' ? 'You (Staff Member)' : 'Hub Knowledge Base'}
              </div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 text-sm text-slate-400 animate-pulse">
              Typing response...
            </div>
          </div>
        )}
      </div>

      {/* Chat Input form (Rule 1 & Rule 38 greyed-out) */}
      <form onSubmit={activeSubmit} className="p-4 bg-dark-800 border-t border-dark-700 shrink-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={activeInput}
            onChange={activeChange}
            disabled={limitReached || isLoadingToken}
            placeholder={
              limitReached 
                ? "Input locked due to question limits." 
                : "Ask about company guidelines or vacation balances..."
            }
            className={`flex-grow px-4 bg-dark-900 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors ${
              limitReached ? 'bg-dark-700 border-dark-600 text-slate-500 cursor-not-allowed' : 'border-dark-700'
            }`}
            style={{ minHeight: '44px' }}
          />
          <button
            type="submit"
            disabled={limitReached || isLoadingToken || !activeInput.trim() || isLoading}
            className={`px-6 font-bold rounded-lg transition-all ${
              limitReached || !activeInput.trim() || isLoading
                ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                : 'bg-brand-500 hover:bg-brand-600 text-dark-900 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
            }`}
            style={{ minHeight: '44px' }}
          >
            Send
          </button>
        </div>
      </form>

      {/* Centered Pricing Modal triggered from the 429 banner (Rule 18 / 38) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark-900/80 backdrop-blur-sm">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-white mb-2">Upgrade Entitlements Plan</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your knowledge base.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-dark-900 font-bold rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Book a Demo
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-dark-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
