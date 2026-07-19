import { Skeleton } from '../../../components/ui/Skeleton';

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-8 md:gap-8 animate-fadeIn">
      <div className="animate-pulse">
        <div className="h-8 bg-primary/10 dark:bg-white/10 rounded-lg w-48 mb-2" />
        <div className="h-4 bg-primary/10 dark:bg-white/10 rounded-lg w-64" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/10 rounded-xl p-8 space-y-4">
          <Skeleton variant="text" className="w-1/4" />
          <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/10">
            <Skeleton variant="rectangular" className="h-5 w-5 rounded" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center justify-between">
                <Skeleton variant="text" className="w-1/3" />
                <Skeleton variant="text" className="w-1/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
