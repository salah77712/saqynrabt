'use client';
import { useEffect, useState } from 'react';
import { useLocale } from '../../providers';

export default function HealthPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [status, setStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mcp) {
          setStatus(data.mcp);
        }
      })
      .catch((err) => console.error('Health check failed:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-4xl animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">{t({en: 'Live MCP Health Dashboard', ar: 'Ù„ÙˆØ­Ø© ØµØ­Ø© MCP Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©'})}</h1>
      {loading ? (
        <p className="text-xs text-primary">{t({en: 'Checking MCP providers...', ar: 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ù…ÙˆÙØ±ÙŠ MCP...'})}</p>
      ) : (
        <div className="grid gap-8">
          {Object.entries(status).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-primary/10 p-2">
              <span className="font-mono text-sm text-primary font-bold">{key.toUpperCase()}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                val === 'online' ? 'bg-blue-50 dark:bg-blue-950 text-accent dark:text-blue-400 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-primary text-primary dark:text-surface border border-gray-200 dark:border-surface/20'
              }`}>
                {val === 'online'
                  ? <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />{t({en: 'Live', ar: 'Ù†Ø´Ø·'})}</span>
                  : <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />{t({en: 'Offline', ar: 'ØºÙŠØ± Ù…ØªØµÙ„'})}</span>
                }
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
