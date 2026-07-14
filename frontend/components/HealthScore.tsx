import * as React from 'react';

interface HealthScoreProps {
score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
const getColor = (val: number) => {
if (val >= 80) return 'text-[#2A5CFF] border-[#2A5CFF] bg-[#F8F9FB]';
if (val >= 50) return 'text-[#2A5CFF] border-amber-500 bg-[#F8F9FB]';
return 'text-[#141F33] border-[#141F33] bg-[#F8F9FB]';
};

return (
<div className={`h-11 w-11 rounded-full border-2 flex items-center justify-center font-black text-xs ${getColor(score)}`}>
{score}%
</div>
);
}
export default HealthScore;
