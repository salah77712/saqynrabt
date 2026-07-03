'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useEntitlements } from '../providers';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const { entitlements, loading, mockMode, setMockMode } = useEntitlements();

  // Rule 32: Voice AI Financial Lock dead-switch
  // Renders voice tabs or screens only if Voice AI is activated
  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  const menuItems = [
    {
      name: 'Staff Knowledge Hub', // Rule 3 exact copy
      path: '/dashboard/chat',
      icon: '💬',
    },
    {
      name: 'Guest & Client Queue', // Rule 3 exact copy
      path: '/dashboard/automation',
      icon: '⚡',
    },
    {
      name: 'Documents Hub',
      path: '/dashboard/documents',
      icon: '📁',
    },
    {
      name: 'Pending Approvals', // Rule 36 approval tab
      path: '/dashboard/approvals',
      icon: '👤',
    },
    {
      name: 'Usage & Settings',
      path: '/dashboard/settings',
      icon: '⚙️',
    },
  ];

  if (isVoiceActivated) {
    menuItems.push({
      name: 'Voice Dispatch Hub', // Rule 32 voice tab
      path: '/dashboard/voice',
      icon: '📞',
    });
  }

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 bg-dark-800 border-r border-dark-700 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo and Brand */}
          <div className="h-16 border-b border-dark-700 flex items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center font-bold text-dark-900 text-xs">
                SR
              </div>
              <span className="font-bold text-sm tracking-wider">SAQYN RABT</span>
            </Link>
            {mockMode && (
              <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-mono font-bold border border-amber-500/20">
                SANDBOX
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 rounded-lg text-sm font-semibold transition-all hover:bg-dark-700 ${
                    isActive 
                      ? 'bg-brand-500 text-dark-900 shadow-md hover:bg-brand-600' 
                      : 'text-slate-300'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account Controls */}
        <div className="p-4 border-t border-dark-700 flex items-center justify-between gap-3">
          {mockMode ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Salah (Demo)</span>
                <span className="text-[10px] text-slate-500">admin@alsafa.qa</span>
              </div>
              <button 
                onClick={() => {
                  setMockMode(false);
                  router.push('/');
                }}
                className="text-xs text-brand-400 hover:text-white"
              >
                Exit Sandbox
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">Salah Al-Qahtani</span>
                  <span className="text-[10px] text-slate-500">Active Admin</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Sandbox Warning Banner */}
        {mockMode && (
          <div className="bg-amber-950/80 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between text-xs text-amber-300">
            <span>⚠️ Running in Demo Sandbox Mode. Local database calls are simulated for instant review.</span>
            <button 
              onClick={() => router.push('/dashboard/settings')} 
              className="underline font-bold hover:text-white"
            >
              Configure Environment
            </button>
          </div>
        )}

        {/* Dashboard Pages Content */}
        <div className="p-6 md:p-8 flex-grow overflow-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
