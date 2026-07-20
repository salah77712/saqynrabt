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
    <div className="mt-4 p-4 rounded-xl border border-primary/10 bg-surface space-y-3">
      <div className="flex items-center gap-3 text-xs font-extrabold uppercase text-primary tracking-wider">
        <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
        <span>Agent Execution Reasoning Trace</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="text-xs space-y-1.5 border-s border-primary/10 ps-4 relative">
            {/* Thought Node */}
            <div className="absolute -inset-inline-start-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
            <p className="font-semibold text-primary">{step.thought}</p>
            
            {/* Tool Action Details */}
            {step.tool && (
              <div className="p-2 bg-surface border border-primary/10 rounded-lg text-xs font-mono text-primary">
                <span className="font-extrabold text-accent">CALL TOOL:</span> {step.tool} ({JSON.stringify(step.toolInput)})
              </div>
            )}

            {/* Tool Output Result */}
            {step.observation && (
              <div className="p-2 bg-surface rounded-lg text-xs font-mono text-primary">
                <span className="font-extrabold text-accent">OBSERVE RESULT:</span> {step.observation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
