export default function DashboardAutomationLoading() {
return (
<div className="space-y-6">
<div className="h-6 w-48 bg-[#141F33] rounded animate-pulse" />
<div className="rounded-xl border border-[#141F33]/10 r   p-8">
<div className="h-4 w-32 bg-[#F8F9FB] rounded animate-pulse mb-4" />
<div className="h-6 w-64 bg-[#F8F9FB] rounded animate-pulse" />
</div>
<div className="grid gap-8 md:grid-cols-2">
{[...Array(4)].map((_, i) => (
<div key={i} className="rounded-xl border border-[#141F33]/10 bg-[#F8F9FB] p-5 shadow-sm">
<div className="flex items-center gap-4 mb-3">
<div className="h-8 w-8 rounded-lg bg-[#141F33] animate-pulse" />
<div className="h-4 w-32 bg-[#141F33] rounded animate-pulse" />
</div>
<div className="h-3 w-full bg-[#F8F9FB] rounded animate-pulse" />
</div>
))}
</div>
</div>
);
}