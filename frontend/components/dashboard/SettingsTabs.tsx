import * as React from 'react';

interface SettingsTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'billing', label: 'Billing' },
    { id: 'security', label: 'Security' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="flex gap-2 border-b border-gray-100 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-[#141F33] text-white dark:bg-royal shadow-sm'
              : 'text-slate-400 hover:text-navy dark:hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
export default SettingsTabs;
