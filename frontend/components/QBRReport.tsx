import * as React from 'react';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';

interface QBRReportProps {
  companyName: string;
  timeSavedHours: number;
  callsHandled: number;
}

export function QBRReport({ companyName, timeSavedHours, callsHandled }: QBRReportProps) {
  return (
    <Card className="max-w-md w-full border-royal/20 border">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-royal">
          Quarterly Business Review
        </span>
        <h3 className="font-bold text-navy dark:text-white text-base mt-1">
          {companyName} — Q2 Performance
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-navy dark:text-white mb-1.5">
            <span>Time Saved</span>
            <span>{timeSavedHours} Hours</span>
          </div>
          <ProgressBar value={85} />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-navy dark:text-white mb-1.5">
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
