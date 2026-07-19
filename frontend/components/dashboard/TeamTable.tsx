import * as React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Download } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

interface TeamTableProps {
  members: Employee[];
  onAction?: (id: string, action: 'approve' | 'suspend' | 'toggle-admin', role?: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onExportSelected?: (selected: Employee[]) => void;
}

type SortKey = 'name' | 'email' | 'role' | 'status';
type SortDir = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

function SortIcon({ column, currentKey, direction }: { column: SortKey; currentKey: SortKey | null; direction: SortDir }) {
  if (column !== currentKey) {
    return <ChevronsUpDown className="w-3 h-3 inline-block ms-1 opacity-30" />;
  }
  return direction === 'asc'
    ? <ChevronUp className="w-3 h-3 inline-block ms-1" />
    : <ChevronDown className="w-3 h-3 inline-block ms-1" />;
}

export function TeamTable({ members, onAction, searchQuery = '', onSearchChange, onExportSelected }: TeamTableProps) {
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const selectAllRef = React.useRef<HTMLInputElement>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = React.useMemo(() => {
    if (!searchQuery) return members;
    const q = searchQuery.toLowerCase();
    return members.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  React.useEffect(() => { setPage(1); }, [searchQuery]);

  const allSelected = paginated.length > 0 && paginated.every(m => selectedIds.has(m.id));
  const someSelected = paginated.some(m => selectedIds.has(m.id));

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        paginated.forEach(m => next.delete(m.id));
        return next;
      });
    } else {
      setSelectedIds(prev => {
        const next = new Set(prev);
        paginated.forEach(m => next.add(m.id));
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

  const getSortAria = (key: SortKey): 'ascending' | 'descending' | 'none' => {
    if (sortKey !== key) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div className="w-full">
      {(onSearchChange || onExportSelected) && (
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          {onSearchChange && (
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { onSearchChange(e.target.value); setPage(1); }}
                placeholder="Search team members..."
                className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Search team members"
              />
            </div>
          )}
          {onExportSelected && selectedIds.size > 0 && (
            <button
              onClick={() => {
                const selected = members.filter(m => selectedIds.has(m.id));
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
            <tr className="border-b border-surface dark:border-slate-700 text-[10px] font-black text-primary dark:text-surface uppercase tracking-wider">
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
              <th className="p-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('name')} aria-sort={getSortAria('name')} scope="col">
                Name<SortIcon column="name" currentKey={sortKey} direction={sortDir} />
              </th>
              <th className="p-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('email')} aria-sort={getSortAria('email')} scope="col">
                Email<SortIcon column="email" currentKey={sortKey} direction={sortDir} />
              </th>
              <th className="p-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('role')} aria-sort={getSortAria('role')} scope="col">
                Role<SortIcon column="role" currentKey={sortKey} direction={sortDir} />
              </th>
              <th className="p-4 cursor-pointer select-none hover:opacity-70 transition-opacity" onClick={() => handleSort('status')} aria-sort={getSortAria('status')} scope="col">
                Status<SortIcon column="status" currentKey={sortKey} direction={sortDir} />
              </th>
              {onAction && <th className="p-4 text-right" scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={onAction ? 7 : 6} className="p-8 text-center text-xs text-primary/60">
                  No members found.
                </td>
              </tr>
            ) : (
              paginated.map((m) => (
                <tr key={m.id} className={`border-b border-surface dark:border-slate-700 last:border-0 odd:bg-white even:bg-surface dark:odd:bg-dark-900 dark:even:bg-slate-900 hover:bg-surface dark:hover:bg-slate-800 transition-colors ${selectedIds.has(m.id) ? 'bg-accent/5' : ''}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(m.id)}
                      onChange={() => toggleOne(m.id)}
                      className="h-4 w-4 rounded border-primary/30 text-accent focus:ring-2 focus:ring-accent"
                      aria-label={`Select ${m.name}`}
                    />
                  </td>
                  <td className="p-4 text-xs font-bold text-navy dark:text-surface">{m.name}</td>
                  <td className="p-4 text-xs text-primary dark:text-surface">{m.email}</td>
                  <td className="p-4 text-xs font-semibold text-primary dark:text-surface uppercase tracking-wider">{m.role}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold ${m.status === 'active' ? 'text-primary dark:text-surface' : 'text-accent'}`}>{m.status}</span>
                  </td>
                  {onAction && (
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-4.5">
                        {m.status === 'pending' ? (
                          <button
                            onClick={() => onAction(m.id, 'approve')}
                            className="px-4 py-2 min-h-[44px] text-xs font-bold text-primary hover:text-primary"
                          >
                            Approve
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => onAction(m.id, 'toggle-admin', m.role)}
                              className={`px-4 py-2 min-h-[44px] text-xs font-bold text-accent hover:text-accent`}
                            >
                              {m.role === 'admin' ? 'Demote' : 'Make Admin'}
                            </button>
                            <button
                              onClick={() => onAction(m.id, 'suspend')}
                              className="px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold text-primary transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-primary"
                            >
                              Suspend
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-surface border border-primary/10 rounded-xl p-4 shadow-sm text-xs font-bold text-primary">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-surface hover:bg-primary border border-primary/10 rounded-xl px-6 py-3 min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            Previous
          </button>
          <span className="text-xs text-primary/60">
            Page {page} of {totalPages} ({sorted.length} total)
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
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
export default TeamTable;
