export default function GlobalLoading() {
  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10/80 bg-surface backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-surface animate-pulse" />
            <div className="space-y-1.5"><div className="h-3 w-24 bg-surface rounded animate-pulse" /><div className="h-2 w-16 bg-surface rounded animate-pulse" /></div>
          </div>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto h-6 w-28 bg-surface rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-2/3 bg-surface rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/2 bg-surface rounded animate-pulse" />
      </section>
      <section className="bg-surface py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface border border-primary/10 rounded-xl p-8 text-center">
              <div className="h-10 w-20 bg-surface rounded animate-pulse mx-auto mb-2" />
              <div className="h-4 w-16 bg-surface rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto h-8 w-48 bg-surface rounded animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border border-primary/10 rounded-xl p-8">
                <div className="h-10 w-10 bg-surface rounded animate-pulse mb-3" />
                <div className="h-6 w-28 bg-surface rounded animate-pulse mb-2" />
                <div className="h-3 w-40 bg-surface rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-surface rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
