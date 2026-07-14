export default function ApprovalsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-40 bg-[#141F33]/10 rounded animate-pulse" />
      <div className="rounded-3xl border border-[#141F33]/10 bg-[#F8F9FB] p-6 shadow-sm">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#141F33]/10 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#141F33]/10 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 w-36 bg-[#141F33]/10 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-[#141F33]/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-[#141F33]/10 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-[#141F33]/5 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}