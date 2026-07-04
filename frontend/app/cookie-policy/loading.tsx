export default function CookieLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-2 w-16 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full">
        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="h-10 w-1/2 bg-slate-200 rounded-lg animate-pulse mb-6" />
        <div className="h-5 w-full bg-slate-100 rounded animate-pulse mb-10" />
        <div className="space-y-8">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-7 w-48 bg-slate-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
