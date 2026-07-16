'use client';

import * as React from 'react';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

interface PullToRefreshProps {
onRefresh: () => Promise<void>;
children: React.ReactNode;
threshold?: number;
}

export function PullToRefresh({ onRefresh, children, threshold = 60 }: PullToRefreshProps) {
const {
pullDistance,
refreshing,
onTouchStart,
onTouchMove,
onTouchEnd,
pullContainerStyle,
} = usePullToRefresh({ onRefresh, threshold });

return (
<div
onTouchStart={onTouchStart}
onTouchMove={onTouchMove}
onTouchEnd={onTouchEnd}
className="relative"
>
{refreshing && (
<div className="flex items-center justify-center py-4">
<span className="h-6 w-6 rounded-full border-3 border-[#141F33]/10 dark:border-[#F8F9FB]/10 border-t-[#141F33] dark:border-t-[#F8F9FB] animate-spin" />
<span className="ml-2 text-xs font-bold text-[#141F33]/60 dark:text-[#F8F9FB]/60">Refreshing...</span>
</div>
)}
{!refreshing && pullDistance > 0 && (
<div className="flex items-center justify-center py-4" style={{ opacity: Math.min(pullDistance / threshold, 1) }}>
<span className="text-xs font-bold text-[#141F33]/60 dark:text-[#F8F9FB]/60">
          {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
</span>
</div>
)}
<div style={pullContainerStyle}>
{children}
</div>
</div>
);
}

export default PullToRefresh;
