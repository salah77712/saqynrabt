export default function DocumentsLoading() {
return (
<div className="space-y-6">
<div className="flex items-center justify-between">
<div className="space-y-1">
<div className="h-6 w-40 bg-[#141F33]/10 rounded animate-pulse" />
<div className="h-4 w-60 bg-[#F8F9FB] rounded animate-pulse" />
</div>
<div className="h-10 w-36 bg-[#141F33]/10 rounded-full animate-pulse" />
</div>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
{[...Array(6)].map((_, i) => (
<div key={i} className="rounded-2xl border border-[#141F33]/10 bg-[#F8F9FB] p-5 shadow-sm">
<div className="flex items-center gap-3 mb-4">
<div className="h-10 w-10 rounded-xl bg-[#141F33]/10 animate-pulse" />
<div className="flex-1 space-y-1.5">
<div className="h-4 w-32 bg-[#141F33]/10 rounded animate-pulse" />
<div className="h-3 w-20 bg-[#F8F9FB] rounded animate-pulse" />
</div>
</div>
<div className="h-3 w-full bg-[#F8F9FB] rounded animate-pulse mb-2" />
<div className="h-3 w-2/3 bg-[#F8F9FB] rounded animate-pulse" />
</div>
))}
</div>
</div>
);
}