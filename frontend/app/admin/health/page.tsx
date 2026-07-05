'use client';
import { useEffect, useState } from 'react';

export default function HealthPage() {
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
      <h1 className="text-2xl font-bold mb-4">Live MCP Health Dashboard</h1>
      {loading ? (
        <p className="text-slate-500">Checking MCP providers...</p>
      ) : (
        <div className="grid gap-4">
          {Object.entries(status).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b p-2">
              <span className="font-mono text-lg">{key.toUpperCase()}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${val === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {val === 'online' ? '🟢 Live' : '🔴 Offline'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
