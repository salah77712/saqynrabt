export default function DashboardAutomationLoading() {
return (
<div className="space-y-6">
<div className="h-6 w-48 bg-primary rounded animate-pulse" />
<div className="rounded-xl border border-primary/10 r   p-8">
<div className="h-4 w-32 bg-surface rounded animate-pulse mb-4" />
<div className="h-6 w-64 bg-surface rounded animate-pulse" />
</div>
<div className="grid gap-8 md:grid-cols-2">
{[...Array(4)].map((_, i) => (
<div key={i} className="rounded-xl border border-primary/10 bg-surface p-5 shadow-sm">
<div className="flex items-center gap-4 mb-3">
<div className="h-8 w-8 rounded-lg bg-primary animate-pulse" />
<div className="h-4 w-32 bg-primary rounded animate-pulse" />
</div>
<div className="h-3 w-full bg-surface rounded animate-pulse" />
</div>
))}
</div>
</div>
);
}