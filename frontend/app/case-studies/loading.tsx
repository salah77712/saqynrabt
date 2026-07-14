export default function CaseStudiesLoading() {
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
        <div className="mx-auto h-6 w-28 bg-[#F8F9FB] rounded-full animate-pulse mb-6" />
        <div className="mx-auto h-10 w-2/3 bg-[#F8F9FB] rounded-lg animate-pulse mb-4" />
        <div className="mx-auto h-5 w-1/2 bg-[#F8F9FB] rounded animate-pulse" />
      </section>
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-3xl p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-32 bg-[#F8F9FB] rounded animate-pulse" />
                  <div className="h-7 w-3/4 bg-[#F8F9FB] rounded animate-pulse" />
                  <div className="h-4 w-full bg-[#F8F9FB] rounded animate-pulse" />
                </div>
                <div className="lg:w-64 bg-[#F8F9FB] rounded-2xl p-5 space-y-3">
                  <div className="h-3 w-20 bg-[#F8F9FB] rounded animate-pulse" />
                  {[...Array(3)].map((_, m) => (
                    <div key={m} className="h-4 w-36 bg-[#F8F9FB] rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
