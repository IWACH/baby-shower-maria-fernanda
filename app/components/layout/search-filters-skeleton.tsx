import { Skeleton } from "@/components/ui/skeleton";

export function SearchFiltersSkeleton() {
  return (
    <div className="max-w-2xl mx-auto mb-10 space-y-6">
      {/* Search Bar Skeleton */}
      <div className="relative">
        <Skeleton className="h-14 w-full rounded-lg" />
      </div>

      {/* Filter Buttons Skeleton */}
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-5 w-32" />
        <div className="flex flex-wrap gap-3 justify-center">
          <Skeleton className="h-10 w-[120px] rounded-full" />
          <Skeleton className="h-10 w-[140px] rounded-full" />
          <Skeleton className="h-10 w-[130px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
