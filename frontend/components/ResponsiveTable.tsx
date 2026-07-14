'use client';

import * as React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Column<T> {
key: string;
header: string;
render: (item: T) => React.ReactNode;
hideOnMobile?: boolean;
}

interface ResponsiveTableProps<T> {
columns: Column<T>[];
data: T[];
keyExtractor: (item: T) => string;
onRowClick?: (item: T) => void;
cardTitle?: (item: T) => string;
}

export function ResponsiveTable<T>({
columns,
data,
keyExtractor,
onRowClick,
cardTitle,
}: ResponsiveTableProps<T>) {
const isMobile = useMediaQuery('(max-width: 767px)');

if (isMobile) {
return (
<div className="space-y-3">
{data.map((item) => (
<div
key={keyExtractor(item)}
onClick={() => onRowClick?.(item)}
className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform"
>
{cardTitle && (
<h4 className="text-sm font-bold text-[#141F33] mb-3 pb-2 border-b border-[#141F33]/10">
{cardTitle(item)}
</h4>
)}
<div className="space-y-2">
{columns.filter((col) => !col.hideOnMobile).map((col) => (
<div key={col.key} className="flex items-center justify-between">
<span className="text-[10px] font-bold uppercase tracking-wider text-[#141F33]/50">
{col.header}
</span>
<span className="text-xs font-semibold text-[#141F33]/70">
{col.render(item)}
</span>
</div>
))}
</div>
</div>
))}
</div>
);
}

return (
<div className="overflow-x-auto w-full border border-[#141F33]/10 rounded-2xl bg-[#F8F9FB] shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#F8F9FB] border-b border-[#141F33]/10 text-[10px] font-black text-[#141F33]/40 uppercase tracking-wider">
{columns.map((col) => (
<th key={col.key} className="p-4">{col.header}</th>
))}
</tr>
</thead>
<tbody>
{data.map((item) => (
<tr
key={keyExtractor(item)}
onClick={() => onRowClick?.(item)}
className="border-b border-[#141F33]/5 last:border-0 hover:bg-[#141F33]/5 cursor-pointer transition-colors"
>
{columns.map((col) => (
<td key={col.key} className="p-4 text-xs font-semibold text-[#141F33]">
{col.render(item)}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
);
}

export default ResponsiveTable;
