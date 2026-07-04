'use client';

import React, { useState } from 'react';

interface HelpTooltipProps {
  content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="h-4 w-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 text-[10px] font-bold flex items-center justify-center border border-gray-200/50"
      >
        ?
      </button>
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] font-bold p-2.5 rounded-lg shadow-xl z-50 text-center animate-fadeIn">
          {content}
        </div>
      )}
    </div>
  );
}
export default HelpTooltip;
