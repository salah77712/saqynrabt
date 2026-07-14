export default function FeaturesLoading() {
  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10/80 bg-[#F8F9FB]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#F8F9FB] animate-pulse" />
            <div className="space-y-1.5"><div className="h-3 w-24 bg-[#F8F9FB] rounded animate-pulse" /><div className="h-2 w-16 bg-[#F8F9FB] rounded animate-pulse" /></div>
          </div>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="mx-auto h-6 w-24 bg-[#F8F9FB] rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-3/4 bg-[#F8F9FB] rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/2 bg-[#F8F9FB] rounded animate-pulse" />
      </section>
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6">
                <div className="h-12 w-12 rounded-xl bg-[#F8F9FB] animate-pulse mb-4" />
                <div className="h-5 w-40 bg-[#F8F9FB] rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-[#F8F9FB] rounded animate-pulse mb-1" />
                <div className="h-4 w-3/4 bg-[#F8F9FB] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
