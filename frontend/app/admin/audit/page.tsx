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

  const [logs, setLogs] = useState<AuditItem[]>([]);

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

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No audit events recorded yet.', ar: 'لم يتم تسجيل أي أحداث تدقيق بعد.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Audit logs will appear once platform activity begins.', ar: 'ستظهر سجلات التدقيق بعد بدء نشاط المنصة.' })}</p>
      </div>

    </div>
  );
}
