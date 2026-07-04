export default function VoiceLoading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mb-3" />
            <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50">
              <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
