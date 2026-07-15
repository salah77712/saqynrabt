'use client';

import React, { useState } from 'react';

interface HelpTooltipProps {
content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
const [visible, setVisible] = useState(false);

return (
<div className="relative inline-block ml-1">
<button
type="button"
onMouseEnter={() => setVisible(true)}
onMouseLeave={() => setVisible(false)}
className="h-4 w-4 rounded-full bg-[#141F33] hover:bg-[#141F33] text-[#141F33] hover:text-[#141F33] text-[10px] font-bold flex items-center justify-center border border-[#141F33]/10"
>
?
</button>
{visible && (
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-[#141F33] text-[#F8F9FB] text-[10px] font-bold p-2.5 rounded-lg shadow-xl z-50 text-center animate-fadeIn">
{content}
</div>
)}
</div>
);
}
export default HelpTooltip;
