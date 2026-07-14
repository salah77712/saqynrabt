export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden h-3 w-16 rounded bg-slate-200 animate-pulse sm:block" />
            <div className="hidden h-3 w-12 rounded bg-slate-200 animate-pulse sm:block" />
            <div className="hidden h-3 w-20 rounded bg-slate-200 animate-pulse sm:block" />
            <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="space-y-3 mb-10">
          <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="h-8 w-96 rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-64 rounded bg-slate-200 animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-slate-200 animate-pulse" />
                  <div className="h-2 w-1/2 rounded bg-slate-100 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-slate-100 animate-pulse" />
                <div className="h-2 w-5/6 rounded bg-slate-100 animate-pulse" />
                <div className="h-2 w-2/3 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-12 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
