'use client';

const metrics = [
  { label: 'Active Requests', value: '24', detail: '+8% this week' },
  { label: 'Document Coverage', value: '92%', detail: 'Updated 3h ago' },
  { label: 'Avg. Resolution', value: '1.8m', detail: 'Fastest response' },
];

const activity = [
  { title: 'New booking request', time: '2 min ago', tone: 'bg-emerald-500' },
  { title: 'Policy update synced', time: '15 min ago', tone: 'bg-sky-500' },
  { title: 'Approval pending', time: '34 min ago', tone: 'bg-amber-500' },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-primary to-slate-900 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Client Workspace</p>
            <h3 className="text-3xl font-semibold leading-tight">Your operations are running smoothly with instant visibility.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Review live requests, monitor knowledge-base health, and route client needs without leaving the dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
            <p className="text-sm text-slate-300">Today’s status</p>
            <p className="mt-2 text-2xl font-semibold">All systems online</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-emerald-600">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Live activity</h4>
              <p className="text-sm text-slate-500">Recent actions across your workspace</p>
            </div>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900">Quick actions</h4>
          <div className="mt-4 space-y-3">
            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <span>Review pending approvals</span>
              <span>→</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <span>Open knowledge hub</span>
              <span>→</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <span>Upload a new document</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
