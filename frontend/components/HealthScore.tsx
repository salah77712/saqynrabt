import * as React from 'react';

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const getColor = (val: number) => {
    if (val >= 80) return 'text-emerald-500 border-emerald-500 bg-emerald-50';
    if (val >= 50) return 'text-orange-500 border-orange-500 bg-orange-50';
    return 'text-red-500 border-red-500 bg-red-50';
  };

  return (
    <div className={`h-11 w-11 rounded-full border-2 flex items-center justify-center font-black text-xs ${getColor(score)}`}>
      {score}%
    </div>
  );
}
export default HealthScore;
