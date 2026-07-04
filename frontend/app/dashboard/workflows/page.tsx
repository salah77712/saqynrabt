'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  desc: string;
}

export default function WorkflowsPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', type: 'trigger', label: 'Incoming Guest Phone Call', desc: 'Fires when Vapi webhook detects call.' },
    { id: '2', type: 'condition', label: 'Outside Business Hours?', desc: 'Checks if time is between 6 PM and 8 AM.' },
    { id: '3', type: 'action', label: 'Route to Guest AI Agent', desc: 'Launches RAG search flow on SOP.' },
  ]);

  const handleAddNode = (type: WorkflowNode['type']) => {
    const label = type === 'action' ? 'New Action Module' : 'New Decision Condition';
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      label,
      desc: 'Configured trigger parameters.',
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Workflow Automation Canvas</h1>
          <p className="text-xs text-slate-500 font-bold">Design routing logic for phone, chat, and escalations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAddNode('condition')}>+ Decision</Button>
          <Button variant="primary" size="sm" onClick={() => handleAddNode('action')}>+ Action</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-12 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 min-h-[400px]">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <Card className="w-64 relative border-royal/35 border-2">
              <Badge variant={node.type === 'trigger' ? 'success' : node.type === 'condition' ? 'warning' : 'primary'} className="mb-2">
                {node.type.toUpperCase()}
              </Badge>
              <h4 className="font-bold text-navy dark:text-white text-sm">{node.label}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{node.desc}</p>
            </Card>
            {index < nodes.length - 1 && (
              <span className="text-2xl text-slate-400 rotate-90 md:rotate-0">➡️</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
