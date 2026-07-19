export default function VoiceLoading() {
return (
<div className="space-y-6">
<div className="h-6 w-40 bg-primary rounded animate-pulse" />
<div className="grid gap-8 md:grid-cols-3">
{[...Array(3)].map((_, i) => (
<div key={i} className="rounded-xl border border-primary/10 bg-surface p-8 shadow-sm">
<div className="h-3 w-24 bg-primary rounded animate-pulse mb-3" />
<div className="h-8 w-16 bg-primary rounded animate-pulse mb-2" />
<div className="h-3 w-20 bg-surface rounded animate-pulse" />
</div>
))}
</div>
<div className="rounded-xl border border-primary/10 bg-surface p-8 shadow-sm">
<div className="h-5 w-32 bg-primary rounded animate-pulse mb-6" />
<div className="space-y-3">
{[...Array(4)].map((_, i) => (
<div key={i} className="flex items-center gap-8 p-3 rounded-xl bg-surface">
<div className="h-10 w-10 rounded-full bg-primary animate-pulse" />
<div className="flex-1 space-y-1.5">
<div className="h-3 w-40 bg-primary rounded animate-pulse" />
<div className="h-3 w-24 bg-surface rounded animate-pulse" />
</div>
<div className="h-6 w-16 bg-primary rounded-full animate-pulse" />
</div>
))}
</div>
</div>
</div>
);
}