export default function VoiceLoading() {
return (
<div className="space-y-6">
<div className="h-6 w-40 bg-[#141F33]/10 rounded animate-pulse" />
<div className="grid gap-4 md:grid-cols-3">
{[...Array(3)].map((_, i) => (
<div key={i} className="rounded-2xl border border-[#141F33]/10 bg-[#F8F9FB] p-5 shadow-sm">
<div className="h-3 w-24 bg-[#141F33]/10 rounded animate-pulse mb-3" />
<div className="h-8 w-16 bg-[#141F33]/10 rounded animate-pulse mb-2" />
<div className="h-3 w-20 bg-[#F8F9FB] rounded animate-pulse" />
</div>
))}
</div>
<div className="rounded-3xl border border-[#141F33]/10 bg-[#F8F9FB] p-6 shadow-sm">
<div className="h-5 w-32 bg-[#141F33]/10 rounded animate-pulse mb-6" />
<div className="space-y-3">
{[...Array(4)].map((_, i) => (
<div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-[#F8F9FB]">
<div className="h-10 w-10 rounded-full bg-[#141F33]/10 animate-pulse" />
<div className="flex-1 space-y-1.5">
<div className="h-3 w-40 bg-[#141F33]/10 rounded animate-pulse" />
<div className="h-3 w-24 bg-[#F8F9FB] rounded animate-pulse" />
</div>
<div className="h-6 w-16 bg-[#141F33]/10 rounded-full animate-pulse" />
</div>
))}
</div>
</div>
</div>
);
}