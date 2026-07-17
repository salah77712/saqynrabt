import * as React from 'react';
import { Card } from '@/components/shadcn/card';
import { ProgressBar } from './ui/ProgressBar';

interface QBRReportProps {
companyName: string;
timeSavedHours: number;
callsHandled: number;
}

export function QBRReport({ companyName, timeSavedHours, callsHandled }: QBRReportProps) {
return (
<Card className="max-w-md w-full border-accent/20 border">
<div className="border-b border-primary/10 pb-4 mb-4">
<span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
Quarterly Business Review
</span>
<h3 className="font-bold text-primary dark:text-surface text-base mt-1">
{companyName} â€” Q2 Performance
</h3>
</div>

<div className="space-y-4">
<div>
<div className="flex justify-between text-xs font-bold text-primary dark:text-surface mb-1.5">
<span>Time Saved</span>
<span>{timeSavedHours} Hours</span>
</div>
<ProgressBar value={85} />
</div>

<div>
<div className="flex justify-between text-xs font-bold text-primary dark:text-surface mb-1.5">
<span>AI Voice Calls Handled</span>
<span>{callsHandled} / 1,000</span>
</div>
<ProgressBar value={Math.min(100, (callsHandled / 1000) * 100)} />
</div>
</div>
</Card>
);
}
export default QBRReport;
