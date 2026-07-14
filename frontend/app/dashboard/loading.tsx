export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#141F33]/10 bg-gradient-to-br from-[#141F33] to-[#141F33] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
<div className="h-3 w-32 bg-[#F8F9FB]/20 rounded animate-pulse" />
<div className="h-8 w-96 bg-[#F8F9FB]/20 rounded animate-pulse" />
<div className="h-4 w-72 bg-[#141F33]/10 rounded animate-pulse" />
          </div>
<div className="rounded-2xl border border-[#141F33]/10 bg-[#141F33]/10 px-5 py-4 backdrop-blur">
<div className="h-3 w-20 bg-[#F8F9FB]/20 rounded animate-pulse" />
<div className="mt-2 h-6 w-28 bg-[#F8F9FB]/20 rounded animate-pulse" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
<div key={i} className="rounded-2xl border border-[#141F33]/10 bg-[#F8F9FB] p-5 shadow-sm">
<div className="h-3 w-24 bg-[#141F33] rounded animate-pulse" />
<div className="mt-3 h-8 w-16 bg-[#141F33] rounded animate-pulse" />
<div className="mt-2 h-3 w-20 bg-[#141F33]/10 rounded animate-pulse" />
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
<div className="rounded-3xl border border-[#141F33]/10 bg-[#F8F9FB] p-6 shadow-sm">
<div className="flex items-center justify-between mb-5">
<div className="space-y-1">
<div className="h-5 w-28 bg-[#141F33] rounded animate-pulse" />
<div className="h-3 w-40 bg-[#141F33]/10 rounded animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-[#141F33] rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
<div key={i} className="flex items-center gap-3 rounded-2xl bg-[#141F33]/5 px-4 py-3">
<div className="h-2.5 w-2.5 rounded-full bg-[#141F33] animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-48 bg-[#141F33]/10 rounded animate-pulse" />
                  <div className="h-2 w-16 bg-[#F8F9FB] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

<div className="rounded-3xl border border-[#141F33]/10 bg-[#F8F9FB] p-6 shadow-sm">
<div className="h-5 w-24 bg-[#141F33] rounded animate-pulse mb-4" />
<div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 w-full rounded-2xl bg-[#141F33]/10 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
