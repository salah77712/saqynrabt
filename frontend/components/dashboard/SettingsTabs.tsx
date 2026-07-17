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
    <div className="flex gap-3 border-b border-surface dark:border-primary pb-3 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === tab.id
? 'bg-primary text-surface dark:bg-royal shadow-sm'
: 'text-primary hover:text-primary dark:hover:text-surface'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
export default SettingsTabs;
