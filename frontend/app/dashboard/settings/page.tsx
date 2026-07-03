'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useEntitlements } from '../../providers';

interface UnknownQuestion {
  id: number;
  question_text: string;
  timestamp: string;
}

export default function SettingsPage() {
  const { getToken } = useAuth();
  const { entitlements, refreshEntitlements, mockMode } = useEntitlements();
  
  // Rule 17 Auto-Overage checkbox state
  const [autoOverage, setAutoOverage] = useState(false);
  const [isSavingOverage, setIsSavingOverage] = useState(false);

  // Rule 40 Unanswered questions list
  const [unknownQuestions, setUnknownQuestions] = useState<UnknownQuestion[]>([]);
  const [showUnknownModal, setShowUnknownModal] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [message, setMessage] = useState({ text: '', type: 'info' });

  // Mock data for Sandbox Mode
  const sandboxQuestions: UnknownQuestion[] = [
    { id: 1, question_text: 'What is the corporate discount code for Qatari nationals?', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: 2, question_text: 'How do staff log hours during Eid holidays?', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() }
  ];

  const maxQuestions = entitlements?.max_questions ?? 1000;
  const activeCount = entitlements?.active_employees ?? 1;

  // Usage stats from database
  const [questionsUsed, setQuestionsUsed] = useState<number | null>(null);
  const [automationTextsUsed, setAutomationTextsUsed] = useState<number | null>(null);
  const automationTextsLimit = entitlements?.automation_texts_limit ?? 300;
  const [showAutomationTooltip, setShowAutomationTooltip] = useState(false);

  const questionsAccrued = questionsUsed !== null ? questionsUsed : (mockMode ? 15 : 25);
  const remainingQuestions = Math.max(0, maxQuestions - questionsAccrued);


  // Fetch live automation usage from usage_ledger
  useEffect(() => {
    if (mockMode) {
      setAutomationTextsUsed(47); // Sandbox demo value
      return;
    }
    const loadUsage = async () => {
      try {
        const token = await getToken();
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
        const res = await fetch(`${apiBase}/api/usage-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAutomationTextsUsed(data?.automation_texts_used ?? 0);
          setQuestionsUsed(data?.questions_count ?? 0);
        }
      } catch (err) {
        console.warn('Usage stats unavailable:', err);
      }
    };
    loadUsage();
  }, [mockMode]);

  // Fetch Unknown Questions (Rule 40)
  const fetchUnknownQuestions = async () => {
    setLoadingQuestions(true);
    if (mockMode) {
      setUnknownQuestions(sandboxQuestions);
      setLoadingQuestions(false);
      return;
    }
    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/knowledge-gaps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUnknownQuestions(data);
      }
    } catch (err: any) {
      console.error("Failed to load gap logs:", err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (showUnknownModal) {
      fetchUnknownQuestions();
    }
  }, [showUnknownModal, mockMode]);

  // Handle auto overage change (Rule 17)
  const handleOverageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setAutoOverage(val);
    
    setIsSavingOverage(true);
    if (mockMode) {
      setTimeout(() => {
        setIsSavingOverage(false);
        setMessage({ text: `Overage auto-billing ${val ? 'enabled' : 'disabled'} successfully (Sandbox).`, type: 'success' });
      }, 500);
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/overage-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ auto_overage_enabled: val }),
      });
      if (response.ok) {
        setMessage({ text: `Auto-billing preferences updated.`, type: 'success' });
      }
    } catch (err: any) {
      setMessage({ text: `Failed to update preferences: ${err.message}`, type: 'error' });
    } finally {
      setIsSavingOverage(false);
    }
  };

  // Export Chat Logs as CSV (Rule 41)
  const handleExportCSV = async () => {
    if (mockMode) {
      // Simulate file download locally
      const csvData = 'Date,Employee Name,Question,AI Answer\n' +
        '"2026-07-03T18:00:00Z","Salah Al-Qahtani","What is office hours?","Office hours are Sunday through Thursday, 8:00 AM to 5:00 PM."\n' +
        '"2026-07-03T19:22:00Z","Tariq Mahmood","How to accrue vacation?","Employees accrue 2.5 vacation days per month, up to 30 days annually."\n';
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'chat_logs_dummy_company.csv');
      a.click();
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/export-logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `chat_logs_${Date.now()}.csv`);
        a.click();
      } else {
        setMessage({ text: 'Error preparing export archive.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: `Export failed: ${err.message}`, type: 'error' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Title */}
      <div className="border-b border-dark-700 pb-6">
        <h1 className="text-2xl font-bold text-white">Usage & System Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review usage logs, billing configurations, and system parameters.
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg text-sm border ${
          message.type === 'success' 
            ? 'bg-emerald-950/60 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-950/60 border-red-500/20 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* 1. Read-Only Usage & Audit Pane (Rule 41) */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-dark-700 pb-4">
          <h2 className="text-base font-bold text-white">Usage Ledger & Compliance Audit</h2>
          <span className="text-xs bg-dark-900 px-3 py-1 border border-dark-700 text-slate-400 rounded-full font-mono">
            Cycle: July 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-900 border border-dark-700 p-5 rounded-lg">
            <span className="text-xs text-slate-500 uppercase font-mono block">Questions Asked</span>
            <span className="text-2xl font-bold text-slate-100">{questionsAccrued}</span>
            <span className="text-slate-500 text-xs"> inquiries</span>
          </div>

          <div className="bg-dark-900 border border-dark-700 p-5 rounded-lg">
            <span className="text-xs text-slate-500 uppercase font-mono block">Remaining Budget</span>
            <span className="text-2xl font-bold text-slate-100">{remainingQuestions}</span>
            <span className="text-slate-500 text-xs"> / {maxQuestions} max limit</span>
          </div>

          <div className="bg-dark-900 border border-dark-700 p-5 rounded-lg">
            <span className="text-xs text-slate-500 uppercase font-mono block">Active Authorized Seats</span>
            <span className="text-2xl font-bold text-slate-100">{activeCount}</span>
            <span className="text-slate-500 text-xs"> employees</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          {/* Export Chat Logs to CSV Button (Rule 41) */}
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto px-6 font-bold bg-dark-700 hover:bg-slate-700 border border-dark-600 text-slate-100 rounded-lg transition-colors flex items-center justify-center gap-2"
            style={{ minHeight: '44px' }}
          >
            <span>📥</span>
            <span>Export Chat Logs to CSV</span>
          </button>

          {/* Review Unknown Questions Button (Rule 40) */}
          <button
            onClick={() => setShowUnknownModal(true)}
            className="w-full sm:w-auto px-6 font-bold bg-brand-500 hover:bg-brand-600 text-dark-900 rounded-lg transition-colors flex items-center justify-center gap-2"
            style={{ minHeight: '44px' }}
          >
            <span>🔍</span>
            <span>Review Unknown Questions</span>
          </button>
        </div>
      </div>

      {/* 2. Automation Usage Card */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-dark-700 pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Automation Usage</h2>
            {/* Info Tooltip */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowAutomationTooltip(true)}
                onMouseLeave={() => setShowAutomationTooltip(false)}
                className="w-4 h-4 rounded-full bg-dark-700 border border-dark-600 text-slate-400 text-[10px] font-bold flex items-center justify-center cursor-default"
                aria-label="What counts as a text request?"
              >
                i
              </button>
              {showAutomationTooltip && (
                <div className="absolute left-6 top-0 z-50 w-72 bg-dark-900 border border-dark-600 rounded-lg p-3 text-xs text-slate-300 shadow-xl">
                  A text request is counted every time a customer sends a message through your website chat, contact form, or WhatsApp/SMS integration.
                </div>
              )}
            </div>
          </div>
          <span className="text-xs bg-dark-900 px-3 py-1 border border-dark-700 text-slate-400 rounded-full font-mono">
            Cycle: July 2026
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Text Requests Used</span>
          <span className="text-sm font-bold text-slate-100">
            {automationTextsUsed !== null ? automationTextsUsed : '—'}
            <span className="text-slate-500 font-normal"> / {automationTextsLimit}</span>
          </span>
        </div>

        {/* Progress bar */}
        {automationTextsUsed !== null && (
          <div className="w-full bg-dark-900 rounded-full h-2 border border-dark-700 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all ${
                automationTextsUsed / automationTextsLimit > 0.85
                  ? 'bg-red-500'
                  : automationTextsUsed / automationTextsLimit > 0.6
                  ? 'bg-amber-400'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (automationTextsUsed / automationTextsLimit) * 100).toFixed(1)}%` }}
            />
          </div>
        )}

        <p className="text-xs text-slate-600">
          Counts website chat, contact form messages, WhatsApp, and SMS requests routed through your automation.
        </p>
      </div>

      {/* 3. Billing Settings & Auto-Overage (Rule 17) */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-md space-y-6">
        <div>
          <h2 className="text-base font-bold text-white mb-1">Billing Preferences</h2>
          <p className="text-xs text-slate-500">
            Set overage allowances for question quotas. Charges are billed automatically.
          </p>
        </div>

        <div className="border-t border-dark-700 pt-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            {/* Auto-Overage Checkbox - UNCHECKED BY DEFAULT (Rule 17) */}
            <input
              type="checkbox"
              checked={autoOverage}
              onChange={handleOverageChange}
              disabled={isSavingOverage}
              className="mt-1 w-4 h-4 rounded border-dark-600 text-brand-500 bg-dark-900 focus:ring-0 cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                I approve automatic billing overages
              </span>
              <span className="text-xs text-slate-500 mt-1 max-w-lg">
                If checked, you will be billed 0.5 QAR per additional question once the monthly question limit is hit. 
                If unchecked, a hard stop will block all staff questions until the next billing cycle.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Unknown Questions Modal (Rule 40) */}
      {showUnknownModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark-900/80 backdrop-blur-sm">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-xl w-full p-6 shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-white mb-2">Unknown Questions Log</h3>
            <p className="text-xs text-slate-500 mb-6">
              Review queries that returned &apos;I could not find the answer...&apos; so you can upload appropriate documents.
            </p>

            {loadingQuestions ? (
              <div className="p-8 text-center text-slate-400 animate-pulse text-sm">
                Retrieving gap logs...
              </div>
            ) : unknownQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 border border-dashed border-dark-700 rounded-lg text-sm mb-6">
                All clear. No unresolved queries logged.
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y divide-dark-700 border border-dark-700 rounded-lg mb-6">
                {unknownQuestions.map((q) => (
                  <div key={q.id} className="p-4 bg-dark-900/40 hover:bg-dark-950/20 transition-colors">
                    <p className="text-sm font-medium text-slate-200">{q.question_text}</p>
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      {new Date(q.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowUnknownModal(false)}
              className="w-full bg-dark-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-colors"
              style={{ minHeight: '44px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
