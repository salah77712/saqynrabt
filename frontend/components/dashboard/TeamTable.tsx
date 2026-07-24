import * as React from 'react';
import { DataTable, type Column } from '@/components/ui/DataTable';

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

export function TeamTable({ members, onAction, searchQuery, onSearchChange, onExportSelected }: TeamTableProps) {
  const columns: Column<Employee>[] = React.useMemo(() => [
    {
      key: 'name',
      header: 'Name',
      render: (m) => <span className="text-xs font-bold text-navy dark:text-surface">{m.name}</span>,
    },
    {
      key: 'email',
      header: 'Email',
      render: (m) => <span className="text-xs text-primary dark:text-surface">{m.email}</span>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (m) => <span className="text-xs font-semibold text-primary dark:text-surface uppercase tracking-wider">{m.role}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (m) => (
        <span className={`text-xs font-bold ${m.status === 'active' ? 'text-primary dark:text-surface' : 'text-accent'}`}>{m.status}</span>
      ),
    },
  ], []);

  return (
    <DataTable<Employee>
      data={members}
      columns={columns}
      keyExtractor={(m) => m.id}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectable={!!onExportSelected}
      onExportSelected={onExportSelected}
      actions={onAction ? (m) => (
        m.status === 'pending' ? (
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
              className="px-4 py-2 min-h-[44px] text-xs font-bold text-accent hover:text-accent"
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
        )
      ) : undefined}
      emptyMessage="No members found."
    />
  );
}

export default TeamTable;
