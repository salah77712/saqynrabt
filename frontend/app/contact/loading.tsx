export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10/80 bg-[#F8F9FB] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[#141F33] animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 bg-[#141F33] rounded animate-pulse" />
              <div className="h-2 w-16 bg-[#F8F9FB] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full">
        <div className="h-4 w-20 bg-[#141F33] rounded animate-pulse mb-6" />
        <div className="h-10 w-2/3 bg-[#141F33] rounded-lg animate-pulse mb-6" />
        <div className="h-5 w-full bg-[#F8F9FB] rounded animate-pulse mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border border-[#141F33]/10 rounded-[40px] p-8">
              <div className="h-6 w-32 bg-[#141F33] rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-[#F8F9FB] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
