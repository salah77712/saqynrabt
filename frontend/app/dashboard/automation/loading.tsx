export default function DashboardAutomationLoading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-primary to-slate-900 p-8">
        <div className="h-4 w-32 bg-white/20 rounded animate-pulse mb-4" />
        <div className="h-6 w-64 bg-white/20 rounded animate-pulse" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
