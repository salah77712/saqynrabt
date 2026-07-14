export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10 bg-[#F8F9FB]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#F8F9FB] animate-pulse" />
            <div className="space-y-1">
              <div className="h-3 w-24 bg-[#F8F9FB] rounded animate-pulse" />
              <div className="h-2 w-16 bg-[#F8F9FB] rounded animate-pulse" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 w-16 bg-[#F8F9FB] rounded animate-pulse" />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#F8F9FB] animate-pulse" />
            <div className="h-10 w-32 rounded-full bg-[#F8F9FB] animate-pulse" />
          </div>
          <div className="md:hidden h-10 w-10 rounded-full bg-[#F8F9FB] animate-pulse" />
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-[#141F33]/10 border-t-[#141F33] animate-spin" />
      </div>
    </div>
  );
}
