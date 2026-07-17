import * as React from 'react';

interface HealthScoreProps {
score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
const getColor = (val: number) => {
if (val >= 80) return 'text-accent border-accent bg-surface';
if (val >= 50) return 'text-accent border-amber-500 bg-surface';
return 'text-primary border-primary bg-surface';
};

return (
<div className={`h-11 w-11 rounded-full border-2 flex items-center justify-center font-black text-xs ${getColor(score)}`}>
{score}%
</div>
);
}
export default HealthScore;
