'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div
          role="tooltip"
          className="absolute bottom-full start-1/2 -translate-x-1/2 mb-3 w-48 bg-primary text-surface text-[10px] font-bold p-2 rounded-lg shadow-xl z-50 text-center animate-fadeIn"
        >
          {content}
        </div>
      )}
    </div>
  );
}
export default Tooltip;
