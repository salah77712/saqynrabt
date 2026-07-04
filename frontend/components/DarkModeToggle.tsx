'use client';

import React, { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local preferences
    const active = localStorage.getItem('theme') === 'dark';
    setDarkMode(active);
    if (active) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
      title="Toggle Dark Mode"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
