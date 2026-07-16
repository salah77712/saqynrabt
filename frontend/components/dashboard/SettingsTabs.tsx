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
    <div className="flex gap-3 border-b border-[#F8F9FB] dark:border-[#141F33] pb-3 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === tab.id
? 'bg-[#141F33] text-[#F8F9FB] dark:bg-royal shadow-sm'
: 'text-[#141F33] hover:text-[#141F33] dark:hover:text-[#F8F9FB]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
export default SettingsTabs;
