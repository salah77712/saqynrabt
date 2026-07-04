'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function AIGovernancePage() {
  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">AI Governance & Transparency</h1>
          <p className="text-xs text-slate-500 font-bold">Track compliance alignment, model auditing, and pipeline fairness metrics.</p>
        </div>
        <Badge variant="success">ISO 42001 Standard</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">Model Inventory</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">RAG Prompt Model</span>
              <span className="font-bold">gpt-4o-mini v1.2</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">Vector Embeddings</span>
              <span className="font-bold">text-embedding-3-small</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Last Fine-Tuning</span>
              <span className="font-bold">2026-07-01</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">Decisions Audit</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">Decisions Logged (90d)</span>
              <span className="font-bold">12,400</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">Safety Policy Matches</span>
              <span className="font-bold text-emerald-500">100% Passed</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Average Confidence</span>
              <span className="font-bold">0.96 / 1.0</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">Bias Evaluation</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">Fairness Rating</span>
              <span className="font-bold text-emerald-500">AAA (99.8%)</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">Gender Parity</span>
              <span className="font-bold">1.0 (Neutral)</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Age Invariance</span>
              <span className="font-bold">1.0 (Neutral)</span>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
