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
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{t({en: 'Live MCP Health Dashboard', ar: 'لوحة صحة MCP المباشرة'})}</h1>
      {loading ? (
        <p className="text-[#141F33]">{t({en: 'Checking MCP providers...', ar: 'جارٍ التحقق من موفري MCP...'})}</p>
      ) : (
        <div className="grid gap-4">
          {Object.entries(status).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b p-2">
              <span className="font-mono text-lg">{key.toUpperCase()}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${val === 'online' ? 'bg-[#F8F9FB] text-[#2A5CFF]' : 'bg-[#F8F9FB] text-[#141F33]'}`}>
                {val === 'online'
                  ? <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2A5CFF]" />{t({en: 'Live', ar: 'نشط'})}</span>
                  : <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />{t({en: 'Offline', ar: 'غير متصل'})}</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
