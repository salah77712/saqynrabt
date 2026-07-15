'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ChatError({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => { console.error(error); }, [error]);

return (
<div className="flex items-center justify-center py-20">
<div className="text-center max-w-md">
<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F9FB]"><AlertTriangle className="w-6 h-6 text-[#141F33]" /></div>
<h2 className="text-2xl font-bold text-primary mb-2">Chat couldn't load</h2>
<p className="text-[#141F33] mb-2">We hit a snag loading the knowledge hub.</p>
<p className="text-sm text-[#141F33] mb-8">Your conversations are all still there. Just give it another go.</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all">Try again</button>
<a href="/dashboard" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#141F33]/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-[#141F33] transition-all">Back to Dashboard</a>
</div>
</div>
</div>
);
}