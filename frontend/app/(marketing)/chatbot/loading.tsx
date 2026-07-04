export default function ChatbotLoading() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
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

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto mb-6 h-6 w-48 bg-slate-200 rounded-full animate-pulse" />
        <div className="mx-auto h-12 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
        <div className="mx-auto mt-6 h-6 w-1/2 bg-slate-100 rounded animate-pulse" />
        <div className="mt-10 flex gap-4 justify-center">
          <div className="h-12 w-36 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-12 w-36 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-slate-100 rounded-xl p-5">
                  <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-64 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`rounded-2xl p-3 max-w-[80%] ${i % 2 === 0 ? 'ml-auto' : ''}`}>
                    <div className={`h-8 ${i % 2 === 0 ? 'w-40' : 'w-56'} bg-slate-200 rounded animate-pulse`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
