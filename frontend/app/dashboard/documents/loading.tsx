export default function DocumentsLoading() {
return (
<div className="space-y-6">
<div className="flex items-center justify-between">
<div className="space-y-1">
<div className="h-6 w-40 bg-primary rounded animate-pulse" />
<div className="h-4 w-60 bg-surface rounded animate-pulse" />
</div>
<div className="h-10 w-36 bg-primary rounded-full animate-pulse" />
</div>
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
{[...Array(6)].map((_, i) => (
<div key={i} className="rounded-xl border border-primary/10 bg-surface p-5 shadow-sm">
<div className="flex items-center gap-4 mb-4">
<div className="h-10 w-10 rounded-xl bg-primary animate-pulse" />
<div className="flex-1 space-y-1.5">
<div className="h-4 w-32 bg-primary rounded animate-pulse" />
<div className="h-3 w-20 bg-surface rounded animate-pulse" />
</div>
</div>
<div className="h-3 w-full bg-surface rounded animate-pulse mb-2" />
<div className="h-3 w-2/3 bg-surface rounded animate-pulse" />
</div>
))}
</div>
</div>
);
}