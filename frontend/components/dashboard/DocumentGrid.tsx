import * as React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DocItem {
  id: string;
  name: string;
  size: string;
  status: 'ready' | 'processing';
}

interface DocumentGridProps {
  docs: DocItem[];
  onDelete: (id: string) => void;
}

export function DocumentGrid({ docs, onDelete }: DocumentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {docs.map((doc) => (
        <Card key={doc.id} className="flex flex-col justify-between p-6">
          <div>
            <div className="flex justify-between items-start gap-4 mb-3">
              <span className="text-2xl">📄</span>
              <button
                onClick={() => onDelete(doc.id)}
                className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1"
                aria-label={`Delete ${doc.name}`}
              >
                ✕
              </button>
            </div>
            <h4 className="font-bold text-navy dark:text-white text-sm truncate" title={doc.name}>
              {doc.name}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">{doc.size}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
            <Badge variant={doc.status === 'ready' ? 'success' : 'primary'}>
              {doc.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
export default DocumentGrid;
