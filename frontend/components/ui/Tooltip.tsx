'use client';

import React, { useState, useCallback } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ content, children, position = 'top', delay = 300 }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = React.useId();

  const handleShow = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(true), delay);
  }, [delay]);

  const handleHide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const positionClasses = {
    top: 'bottom-full start-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full start-1/2 -translate-x-1/2 mt-2',
    left: 'end-full top-1/2 -translate-y-1/2 me-2',
    right: 'start-full top-1/2 -translate-y-1/2 ms-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        aria-describedby={show ? id : undefined}
      >
        {children}
      </div>
      {show && (
        <div
          id={id}
          role="tooltip"
          className={`absolute w-48 bg-primary text-surface text-xs font-bold p-2 rounded-lg shadow-xl z-50 text-center animate-fadeIn ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
export default Tooltip;
