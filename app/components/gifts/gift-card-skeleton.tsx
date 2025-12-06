import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function GiftCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg bg-card/80 backdrop-blur-sm">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full" />

      {/* Title Skeleton */}
      <CardHeader className="flex-grow">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      {/* Buttons Skeleton */}
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

interface GiftListSkeletonProps {
  count?: number;
}

export function GiftListSkeleton({ count = 8 }: GiftListSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <GiftCardSkeleton key={index} />
      ))}
    </div>
  );
}
