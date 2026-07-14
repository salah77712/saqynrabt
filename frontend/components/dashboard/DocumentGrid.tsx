import * as React from 'react';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../ui/Badge';
import { FileText, Trash2 } from 'lucide-react';

interface DocItem {
  id: string;
  name: string;
  size: string;
  status: 'ready' | 'processing' | 'failed';
}

interface DocumentGridProps {
  docs: DocItem[];
  onDelete: (id: string) => void;
}

export function DocumentGrid({ docs, onDelete }: DocumentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {docs.map((doc) => (
        <Card key={doc.id} className="flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
          <div>
            <div className="flex justify-between items-start gap-4 mb-3">
              <FileText className="w-6 h-6 text-slate-500" />
              <button
                onClick={() => onDelete(doc.id)}
                className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1 transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95"
                aria-label={`Delete ${doc.name}`}
              >
                <Trash2 className="w-5 h-5" />
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
