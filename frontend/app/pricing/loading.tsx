export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10 bg-[#F8F9FB]/80 backdrop-blur-xl">
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
      <section className="bg-[#F8F9FB] to-[#F8F9FB] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mx-auto h-6 w-24 bg-[#141F33]/10 rounded-full animate-pulse mb-6" />
          <div className="mx-auto h-10 w-1/2 bg-slate-200 rounded-lg animate-pulse mb-4" />
          <div className="mx-auto h-5 w-1/3 bg-slate-100 rounded animate-pulse" />
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[...Array(2)].map((_, col) => (
              <div key={col}>
                <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
                <div className="flex flex-col gap-5">
                  {[...Array(3)].map((_, row) => (
                    <div key={row} className="border border-slate-200 rounded-xl p-6">
                      <div className="flex justify-between mb-4">
                        <div className="space-y-2">
                          <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                          <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-7 w-24 bg-slate-200 rounded animate-pulse" />
                          <div className="h-3 w-16 bg-slate-100 rounded animate-pulse ml-auto" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(5)].map((_, f) => (
                          <div key={f} className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                        ))}
                      </div>
                      <div className="mt-5 h-11 w-full bg-slate-200 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
