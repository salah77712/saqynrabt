import { SkeletonMetricGrid, SkeletonCard } from '../../../components/ui/Skeleton';

export default function GuardrailsLoading() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="animate-pulse">
        <div className="h-8 bg-primary/10 dark:bg-white/10 rounded-lg w-72 mb-2" />
        <div className="h-4 bg-primary/10 dark:bg-white/10 rounded-lg w-96" />
      </div>
      <SkeletonMetricGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}