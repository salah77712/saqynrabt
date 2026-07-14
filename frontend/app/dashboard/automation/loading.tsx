export default function DashboardAutomationLoading() {
return (
<div className="space-y-6">
<div className="h-6 w-48 bg-[#141F33]/10 rounded animate-pulse" />
<div className="rounded-3xl border border-[#141F33]/10 bg-gradient-to-br from-[#141F33] to-[#141F33] p-8">
<div className="h-4 w-32 bg-[#F8F9FB]/20 rounded animate-pulse mb-4" />
<div className="h-6 w-64 bg-[#F8F9FB]/20 rounded animate-pulse" />
</div>
<div className="grid gap-4 md:grid-cols-2">
{[...Array(4)].map((_, i) => (
<div key={i} className="rounded-2xl border border-[#141F33]/10 bg-[#F8F9FB] p-5 shadow-sm">
<div className="flex items-center gap-3 mb-3">
<div className="h-8 w-8 rounded-lg bg-[#141F33]/10 animate-pulse" />
<div className="h-4 w-32 bg-[#141F33]/10 rounded animate-pulse" />
</div>
<div className="h-3 w-full bg-[#F8F9FB] rounded animate-pulse" />
</div>
))}
</div>
</div>
);
}