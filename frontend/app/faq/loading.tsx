export default function FAQLoading() {
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
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto h-6 w-16 bg-surface rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-1/2 bg-surface rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/3 bg-surface rounded animate-pulse" />
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
        {[...Array(3)].map((_, cat) => (
          <div key={cat}>
            <div className="h-7 w-40 bg-surface rounded animate-pulse mb-6" />
            <div className="space-y-3">
              {[...Array(3)].map((_, q) => (
                <div key={q} className="border border-primary/10 rounded-xl p-4">
                  <div className="h-5 w-3/4 bg-surface rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
