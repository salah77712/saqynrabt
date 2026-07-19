export default function NdaLoading() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-50 border-b border-[rgba(20,31,51,0.1)] bg-surface backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-primary animate-pulse" />
            <div className="h-4 w-28 rounded bg-primary animate-pulse" />
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden h-3 w-16 rounded bg-primary animate-pulse sm:block" />
            <div className="hidden h-3 w-12 rounded bg-primary animate-pulse sm:block" />
            <div className="hidden h-3 w-20 rounded bg-primary animate-pulse sm:block" />
            <div className="h-8 w-8 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="space-y-3 mb-10">
          <div className="h-4 w-48 rounded bg-primary animate-pulse" />
          <div className="h-8 w-96 rounded bg-primary animate-pulse" />
          <div className="h-4 w-64 rounded bg-primary animate-pulse" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[rgba(20,31,51,0.1)] bg-surface p-5 shadow-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-primary animate-pulse" />
                  <div className="h-2 w-1/2 rounded bg-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-primary animate-pulse" />
                <div className="h-2 w-5/6 rounded bg-primary animate-pulse" />
                <div className="h-2 w-2/3 rounded bg-primary animate-pulse" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[rgba(20,31,51,0.05)] pt-4">
                <div className="h-3 w-16 rounded bg-primary animate-pulse" />
                <div className="h-3 w-12 rounded bg-primary animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}