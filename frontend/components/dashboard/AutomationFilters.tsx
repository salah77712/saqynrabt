import * as React from 'react';
import { Input } from '../ui/Input';

interface AutomationFiltersProps {
  filter: string;
  onFilterChange: (val: string) => void;
  search: string;
  onSearchChange: (val: string) => void;
}

export function AutomationFilters({ filter, onFilterChange, search, onSearchChange }: AutomationFiltersProps) {
  const options = ['all', 'pending', 'assigned', 'completed'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="w-full sm:w-72">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by customer name..."
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onFilterChange(opt)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
              filter === opt
                ? 'bg-white dark:bg-slate-900 text-navy dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-navy dark:hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
export default AutomationFilters;
