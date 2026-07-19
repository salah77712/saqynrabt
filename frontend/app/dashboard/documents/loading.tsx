import { Skeleton } from '../../../components/ui/Skeleton';

export default function DocumentsLoading() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="animate-pulse">
        <div className="h-8 bg-primary/10 dark:bg-white/10 rounded-lg w-48 mb-2" />
        <div className="h-4 bg-primary/10 dark:bg-white/10 rounded-lg w-64" />
      </div>
      <Skeleton variant="rectangular" className="h-48 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/10 rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/2" />
              </div>
            </div>
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-5/6" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
