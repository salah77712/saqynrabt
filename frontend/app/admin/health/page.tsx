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
      <h1 className="text-xl font-extrabold text-[#141F33] mb-4">{t({en: 'Live MCP Health Dashboard', ar: 'لوحة صحة MCP المباشرة'})}</h1>
      {loading ? (
        <p className="text-xs text-[#141F33]">{t({en: 'Checking MCP providers...', ar: 'جارٍ التحقق من موفري MCP...'})}</p>
      ) : (
        <div className="grid gap-8">
          {Object.entries(status).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-[#141F33]/10 p-2">
              <span className="font-mono text-sm text-[#141F33] font-bold">{key.toUpperCase()}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                val === 'online' ? 'bg-blue-50 text-[#2A5CFF] border border-blue-200' : 'bg-gray-50 text-[#141F33] border border-gray-200'
              }`}>
                {val === 'online'
                  ? <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2A5CFF]" />{t({en: 'Live', ar: 'نشط'})}</span>
                  : <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#141F33]" />{t({en: 'Offline', ar: 'غير متصل'})}</span>
                }
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
