export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-2" />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between pb-6 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="space-y-1.5">
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-48 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-slate-200 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
