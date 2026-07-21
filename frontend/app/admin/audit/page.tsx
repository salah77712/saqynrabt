'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useLocale } from '../../providers';

interface AuditItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ipAddress: string;
}

type AuditSortKey = 'timestamp' | 'user' | 'action' | 'ipAddress';
type SortDir = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function AdminAuditPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<AuditSortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

  const [logs, setLogs] = useState<AuditItem[]>([
    { id: 'log-1', timestamp: '2026-07-04T16:35:12Z', user: 'admin@alsafa.qa', action: 'Approved Employee Access (ahmed@alsafa.qa)', ipAddress: '82.148.97.10' },
    { id: 'log-2', timestamp: '2026-07-04T16:22:45Z', user: 'admin@alsafa.qa', action: 'Uploaded private document (front_desk_sop.pdf)', ipAddress: '82.148.97.10' },
    { id: 'log-3', timestamp: '2026-07-04T14:10:02Z', user: 'sara@alsafa.qa', action: 'Requested chatbot answer (rollover vacation)', ipAddress: '89.211.23.104' },
    { id: 'log-4', timestamp: '2026-07-03T11:45:19Z', user: 'admin@alsafa.qa', action: 'Toggled au overage settings', ipAddress: '82.148.97.12' },
  ]);

  const handleSort = (key: AuditSortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const getSortAria = (key: AuditSortKey): 'ascending' | 'descending' | 'none' => {
    if (sortKey !== key) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  const filteredLogs = useMemo(() => {
    let result = logs.filter(log =>
      log.user?.toLowerCase().includes(search?.toLowerCase()) ||
      log.action?.toLowerCase().includes(search?.toLowerCase()) ||
      log.ipAddress?.toLowerCase().includes(search?.toLowerCase())
    );
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        const cmp = aVal.localeCompare(bVal);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [logs, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginated = filteredLogs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const allSelected = paginated.length > 0 && paginated.every(l => selectedIds.has(l.id));
  const someSelected = paginated.some(l => selectedIds.has(l.id));

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(prev => { const n = new Set(prev); paginated.forEach(l => n.delete(l.id)); return n; });
    } else {
      setSelectedIds(prev => { const n = new Set(prev); paginated.forEach(l => n.add(l.id)); return n; });
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  const handleExportCSV = useCallback(() => {
    const selected = logs.filter(l => selectedIds.has(l.id));
    const data = selected.length > 0 ? selected : filteredLogs;
    const rows = [
      ['Timestamp', 'User', 'Action', 'IP Address'],
      ...data.map(l => [new Date(l.timestamp).toISOString(), l.user, l.action, l.ipAddress]),
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }, [logs, selectedIds, filteredLogs]);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Page Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Security & Audit Logs', ar: 'سجلات الأمن والتدقيق' })}</h1>
          <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Audit all platform events, tenant activity, and security changes.', ar: 'مراجعة جميع أحداث المنصة، نشاط الشركات، والتغييرات الأمنية.' })}</p>
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder={t({ en: 'Filter logs...', ar: 'تصفية السجلات...' })}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal w-64"
          />
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-primary/10 text-xs font-bold text-primary hover:bg-primary transition-all"
          >
            {selectedIds.size > 0 ? `Export (${selectedIds.size})` : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-background border border-primary/10 rounded-xl shadow-sm overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-surface border-b border-primary/10 text-xs font-extrabold text-primary uppercase tracking-wider">
                <th className="px-6 py-4 w-10" scope="col">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-primary/30 text-accent focus:ring-2 focus:ring-accent"
                    aria-label="Select all rows"
                  />
                </th>
                <th className="px-6 py-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('timestamp')} aria-sort={getSortAria('timestamp')} scope="col">
                  {t({ en: 'Timestamp', ar: 'الوقت والشبكة' })}
                </th>
                <th className="px-6 py-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('user')} aria-sort={getSortAria('user')} scope="col">
                  {t({ en: 'Operator User', ar: 'المستخدم المشغل' })}
                </th>
                <th className="px-6 py-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('action')} aria-sort={getSortAria('action')} scope="col">
                  {t({ en: 'Action Performed', ar: 'الإجراء المنفذ' })}
                </th>
                <th className="px-6 py-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('ipAddress')} aria-sort={getSortAria('ipAddress')} scope="col">
                  {t({ en: 'IP Address', ar: 'عنوان الـ IP' })}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10 text-xs font-semibold text-primary">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-primary/60">
                    {t({ en: 'No logs found.', ar: 'لم تعثر على سجلات.' })}
                  </td>
                </tr>
              ) : (
                paginated.map((log) => (
                  <tr key={log.id} className={`hover:bg-primary transition-colors ${selectedIds.has(log.id) ? 'bg-accent/5' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(log.id)}
                        onChange={() => toggleOne(log.id)}
                        className="h-4 w-4 rounded border-primary/30 text-accent focus:ring-2 focus:ring-accent"
                        aria-label={`Select log ${log.id}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-primary font-bold">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-primary">{log.user}</td>
                    <td className="px-6 py-4 text-primary">{log.action}</td>
                    <td className="px-6 py-4 font-mono text-primary font-bold">{log.ipAddress}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-surface border border-primary/10 rounded-xl p-4 shadow-sm text-xs font-bold text-primary">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            {t({ en: 'Previous', ar: 'السابق' })}
          </button>
          <span className="text-xs text-primary/60">
            {t({ en: `Page ${page} of ${totalPages}`, ar: `الصفحة ${page} من ${totalPages}` })}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            {t({ en: 'Next', ar: 'التالي' })}
          </button>
        </div>
      )}

    </div>
  );
}
