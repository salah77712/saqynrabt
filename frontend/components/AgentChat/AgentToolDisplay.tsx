'use client';

import React from 'react';

interface AgentStepLog {
  thought: string;
  tool?: string;
  toolInput?: any;
  observation?: string;
}

interface AgentToolDisplayProps {
  steps: AgentStepLog[];
}

export function AgentToolDisplay({ steps }: AgentToolDisplayProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-4 p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#718096] tracking-wider">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2A5CFF] animate-pulse" />
        <span>Agent Execution Reasoning Trace</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="text-xs space-y-1.5 border-l border-slate-200 pl-4 relative">
            {/* Thought Node */}
            <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300" />
            <p className="font-semibold text-slate-700">{step.thought}</p>
            
            {/* Tool Action Details */}
            {step.tool && (
              <div className="p-2 bg-white border border-slate-100 rounded-lg text-[10px] font-mono text-[#141F33]">
                <span className="font-extrabold text-[#2A5CFF]">CALL TOOL:</span> {step.tool} ({JSON.stringify(step.toolInput)})
              </div>
            )}

            {/* Tool Output Result */}
            {step.observation && (
              <div className="p-2 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-600">
                <span className="font-extrabold text-emerald-600">OBSERVE RESULT:</span> {step.observation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
