export default function HowItWorksLoading() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
            <div className="space-y-1.5"><div className="h-3 w-24 bg-slate-200 rounded animate-pulse" /><div className="h-2 w-16 bg-slate-100 rounded animate-pulse" /></div>
          </div>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto h-6 w-28 bg-slate-200 rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-3/4 bg-slate-200 rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/2 bg-slate-100 rounded animate-pulse" />
      </section>
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
