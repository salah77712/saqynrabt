export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-40 bg-surface rounded animate-pulse mb-2" />
      <div className="rounded-xl border border-primary/10 bg-surface p-8 shadow-sm space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between pb-6 border-b border-primary/10 last:border-0 last:pb-0">
            <div className="space-y-1.5">
              <div className="h-4 w-32 bg-surface rounded animate-pulse" />
              <div className="h-3 w-48 bg-surface rounded animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-surface rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

