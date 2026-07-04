export default function IndustriesLoading() {
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
        <div className="mx-auto h-6 w-24 bg-slate-200 rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-3/4 bg-slate-200 rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/2 bg-slate-100 rounded animate-pulse" />
      </section>
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse mb-3" />
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse mb-1" />
                <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
