export default function ChatLoading() {
return (
<div className="flex flex-col h-full space-y-4">
<div className="flex-1 rounded-[40px] border border-[#141F33]/10 bg-[#F8F9FB] p-8 shadow-sm">
<div className="flex items-center gap-4 pb-4 border-b border-[#141F33]/10 mb-4">
<div className="h-10 w-10 rounded-[40px] bg-[#141F33] animate-pulse" />
<div className="space-y-1.5">
<div className="h-4 w-40 bg-[#141F33] rounded animate-pulse" />
<div className="h-3 w-24 bg-[#F8F9FB] rounded animate-pulse" />
</div>
</div>
<div className="space-y-4">
{[...Array(5)].map((_, i) => (
<div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
<div className={`rounded-[40px] p-4 ${i % 2 === 0 ? 'bg-primary/10' : 'bg-[#F8F9FB]'}`}
style={{ width: `${Math.max(40, 80 - i * 8)}%` }}>
<div className="h-3 w-full bg-[#141F33] rounded animate-pulse mb-2" />
<div className="h-3 w-2/3 bg-[#141F33] rounded animate-pulse" />
</div>
</div>
))}
</div>
</div>
<div className="h-14 rounded-[40px] border border-[#141F33]/10 bg-[#F8F9FB] shadow-sm">
<div className="h-full w-full bg-[#F8F9FB] rounded-[40px] animate-pulse" />
</div>
</div>
);
}