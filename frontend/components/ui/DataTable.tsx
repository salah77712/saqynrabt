'use client';

import * as React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Download } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ITEMS_PER_PAGE = 10;

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render: (item: T) => React.ReactNode;
  hideOnMobile?: boolean;
  className?: string;
}

function SortIcon({ column, currentKey, direction }: { column: string; currentKey: string | null; direction: 'asc' | 'desc' }) {
  if (column !== currentKey) {
    return <ChevronsUpDown className="w-3 h-3 inline-block ms-1 opacity-30" />;
  }
  return direction === 'asc'
    ? <ChevronUp className="w-3 h-3 inline-block ms-1" />
    : <ChevronDown className="w-3 h-3 inline-block ms-1" />;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;

  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  selectable?: boolean;
  onExportSelected?: (selected: T[]) => void;

  actions?: (item: T) => React.ReactNode;

  loading?: boolean;
  emptyMessage?: string;
  mobileCard?: (item: T) => React.ReactNode;

  pageSize?: number;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  selectable = false,
  onExportSelected,
  actions,
  loading = false,
  emptyMessage = 'No data found.',
  mobileCard,
  pageSize = ITEMS_PER_PAGE,
  className = '',
}: DataTableProps<T>) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const selectAllRef = React.useRef<HTMLInputElement>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => { setPage(1); }, [searchQuery]);

  const allSelected = paginated.length > 0 && paginated.every(m => selectedIds.has(keyExtractor(m)));
  const someSelected = paginated.some(m => selectedIds.has(keyExtractor(m)));

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        paginated.forEach(m => next.delete(keyExtractor(m)));
        return next;
      });
    } else {
      setSelectedIds(prev => {
        const next = new Set(prev);
        paginated.forEach(m => next.add(keyExtractor(m)));
        return next;
      });
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getSortAria = (key: string): 'ascending' | 'descending' | 'none' => {
    if (sortKey !== key) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  const visibleColumns = isMobile ? columns.filter(c => !c.hideOnMobile) : columns;
  const colspan = visibleColumns.length + (selectable ? 1 : 0) + (actions ? 1 : 0);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-primary/5 dark:bg-primary/10" />
        ))}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={`w-full ${className}`}>
        {(onSearchChange || (selectable && onExportSelected)) && (
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            {onSearchChange && (
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            )}
            {selectable && onExportSelected && selectedIds.size > 0 && (
              <button
                onClick={() => {
                  const selected = data.filter(m => selectedIds.has(keyExtractor(m)));
                  onExportSelected(selected);
                }}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-primary/10 text-xs font-bold text-primary hover:bg-primary transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Export Selected ({selectedIds.size})
              </button>
            )}
          </div>
        )}
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-xs text-primary/60">{emptyMessage}</div>
        ) : mobileCard ? (
          <div className="space-y-3">
            {paginated.map(item => (
              <div key={keyExtractor(item)} className="bg-surface border border-primary/10 rounded-xl p-4 shadow-sm">
                {mobileCard(item)}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map(item => (
              <div key={keyExtractor(item)} className="bg-surface border border-primary/10 rounded-xl p-4 shadow-sm">
                <div className="space-y-2">
                  {visibleColumns.map(col => (
                    <div key={col.key} className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary/50">{col.header}</span>
                      <span className="text-xs font-semibold text-primary">{col.render(item)}</span>
                    </div>
                  ))}
                  {actions && <div className="flex justify-end gap-2 pt-2">{actions(item)}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 bg-surface border border-primary/10 rounded-xl p-4 shadow-sm text-xs font-bold text-primary">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] disabled:opacity-40">Previous</button>
            <span className="text-xs text-primary/60">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] disabled:opacity-40">Next</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {(onSearchChange || (selectable && onExportSelected)) && (
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          {onSearchChange && (
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={searchPlaceholder}
              />
            </div>
          )}
          {selectable && onExportSelected && selectedIds.size > 0 && (
            <button
              onClick={() => {
                const selected = data.filter(m => selectedIds.has(keyExtractor(m)));
                onExportSelected(selected);
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-primary/10 text-xs font-bold text-primary hover:bg-primary transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export Selected ({selectedIds.size})
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto w-full border border-surface dark:border-slate-700 rounded-xl bg-surface dark:bg-dark-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-surface dark:bg-dark-900">
            <tr className="border-b border-surface dark:border-slate-700 text-xs font-black text-primary dark:text-surface uppercase tracking-wider">
              {selectable && (
                <th className="p-4 w-10" scope="col">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-primary/30 text-accent focus:ring-2 focus:ring-accent"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  className={`p-4 ${col.sortable !== false ? 'cursor-pointer select-none hover:opacity-70 transition-opacity' : ''} ${col.className ?? ''}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  aria-sort={col.sortable !== false ? getSortAria(col.key) : undefined}
                  scope="col"
                >
                  {col.header}
                  {col.sortable !== false && <SortIcon column={col.key} currentKey={sortKey} direction={sortDir} />}
                </th>
              ))}
              {actions && <th className="p-4 text-right" scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={colspan} className="p-8 text-center text-xs text-primary/60">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((item) => {
                const id = keyExtractor(item);
                return (
                  <tr key={id} className={`border-b border-surface dark:border-slate-700 last:border-0 odd:bg-white even:bg-surface dark:odd:bg-dark-900 dark:even:bg-slate-900 hover:bg-surface dark:hover:bg-slate-800 transition-colors ${selectable && selectedIds.has(id) ? 'bg-accent/5' : ''}`}>
                    {selectable && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(id)}
                          onChange={() => toggleOne(id)}
                          className="h-4 w-4 rounded border-primary/30 text-accent focus:ring-2 focus:ring-accent"
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}
                    {visibleColumns.map(col => (
                      <td key={col.key} className={`p-4 text-xs font-semibold text-primary dark:text-surface ${col.className ?? ''}`}>
                        {col.render(item)}
                      </td>
                    ))}
                    {actions && (
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-4.5">
                          {actions(item)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-surface border border-primary/10 rounded-xl p-4 shadow-sm text-xs font-bold text-primary">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            Previous
          </button>
          <span className="text-xs text-primary/60">
            Page {page} of {totalPages} ({sorted.length} total)
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
