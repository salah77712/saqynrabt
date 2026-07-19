import { Skeleton } from '../../../components/ui/Skeleton';

export default function AnalyticsLoading() {
  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="animate-pulse">
          <div className="h-8 bg-primary/10 dark:bg-white/10 rounded-lg w-48 mb-2" />
          <div className="h-4 bg-primary/10 dark:bg-white/10 rounded-lg w-64" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} variant="metric-card" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" className="h-[350px]" />
        ))}
      </div>
    </div>
  );
}
