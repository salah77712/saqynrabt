'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useEntitlements } from '../../providers';

interface Employee {
  id: number;
  clerk_user_id: string;
  name: string;
  email: string;
  status: 'pending' | 'active';
  role: string;
}

export default function ApprovalsPage() {
  const { getToken } = useAuth();
  const { entitlements, refreshEntitlements, mockMode } = useEntitlements();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Local state for sandbox simulation
  const [sandboxEmployees, setSandboxEmployees] = useState<Employee[]>([
    { id: 1, clerk_user_id: 'user_2Pnd12345demo', name: 'Tariq Mahmood', email: 'pending.employee@alsafa.qa', status: 'pending', role: 'employee' },
    { id: 2, clerk_user_id: 'user_admin12345demo', name: 'Salah Al-Qahtani', email: 'admin@alsafa.qa', status: 'active', role: 'admin' }
  ]);

  const maxEmployees = entitlements?.max_employees ?? 50;
  const activeCount = mockMode 
    ? sandboxEmployees.filter(e => e.status === 'active').length 
    : (entitlements?.active_employees ?? 0);

  const limitReached = activeCount >= maxEmployees;

  const fetchEmployees = async () => {
    if (mockMode) {
      setEmployees(sandboxEmployees);
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to retrieve employee ledger.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [mockMode, sandboxEmployees]);

  const handleApprove = async (clerkUserId: string) => {
    if (limitReached) return;

    if (mockMode) {
      setSandboxEmployees(prev =>
        prev.map(e => e.clerk_user_id === clerkUserId ? { ...e, status: 'active' as const } : e)
      );
      return;
    }

    try {
      const token = await getToken();
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiBase}/api/employees`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clerk_user_id: clerkUserId,
          status: 'active',
        }),
      });

      if (response.ok) {
        fetchEmployees();
        refreshEntitlements();
      } else {
        const errData = await response.json();
        setErrorMessage(errData.message || 'Activation rejected.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during activation.');
    }
  };

  const pendingList = employees.filter(e => e.status === 'pending');
  const activeList = employees.filter(e => e.status === 'active');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Pending Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">
            Authorize team access locks to unlock the staff knowledge hub chat.
          </p>
        </div>
        <div className="bg-dark-800 border border-dark-700 px-4 py-2 rounded-lg text-right">
          <span className="text-xs text-slate-500 block uppercase font-mono">Active Seats</span>
          <span className="text-lg font-bold text-brand-400">{activeCount}</span>
          <span className="text-slate-500 text-xs"> / {maxEmployees} limit</span>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-950/60 border border-red-500/20 text-red-300 p-4 rounded-lg text-sm">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Pending Approvals Panel (Rule 36) */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-dark-900/60 border-b border-dark-700">
          <h2 className="text-sm font-semibold text-slate-300">Pending Authorization</h2>
        </div>
        
        {pendingList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            All clear. No pending requests.
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {pendingList.map((emp) => (
              <div key={emp.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-900/20 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white text-base">{emp.name}</span>
                  <span className="text-xs text-slate-500 font-mono">{emp.email}</span>
                </div>

                {/* Approve Button container (Rule 28 tooltip wrapper) */}
                <div className="relative group self-start sm:self-center">
                  <button
                    onClick={() => handleApprove(emp.clerk_user_id)}
                    disabled={limitReached}
                    className={`px-5 font-bold rounded-lg transition-all ${
                      limitReached
                        ? 'bg-dark-700 text-slate-500 cursor-not-allowed border border-dark-600'
                        : 'bg-brand-500 hover:bg-brand-600 text-dark-900 shadow-md'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    Approve
                  </button>
                  
                  {/* Tooltip on plan limit reached (Rule 28) */}
                  {limitReached && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-dark-900 border border-dark-700 p-2 rounded shadow-xl text-center text-xs text-slate-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      Plan limit reached. Upgrade to add more team members.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Employees List */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-dark-900/60 border-b border-dark-700">
          <h2 className="text-sm font-semibold text-slate-300">Authorized Team Members</h2>
        </div>
        {activeList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No authorized members. Activate pending records.
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {activeList.map((emp) => (
              <div key={emp.id} className="px-6 py-4 flex items-center justify-between gap-4 text-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-200">{emp.name}</span>
                  <span className="text-xs text-slate-500 font-mono">{emp.email}</span>
                </div>
                <span className="px-2.5 py-0.5 text-xs bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-500/20 rounded-full capitalize">
                  {emp.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulator helper for demos */}
      {mockMode && (
        <div className="bg-dark-800/40 border border-dark-700 p-4 rounded-xl flex items-center justify-between text-xs text-slate-400">
          <span>Demo Tool: Click to simulate reaching the employee plan ceiling.</span>
          <button
            onClick={() => {
              // decrease max entitlements to trigger disabled state
              if (entitlements) {
                entitlements.max_employees = activeCount;
                refreshEntitlements();
              }
            }}
            className="px-3 py-1 bg-dark-700 hover:bg-dark-600 rounded text-slate-300 font-semibold"
          >
            Force Ceiling Limit
          </button>
        </div>
      )}

    </div>
  );
}
