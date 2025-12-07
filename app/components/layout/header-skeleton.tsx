import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-accent/70 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Skeleton para el lado izquierdo - podría ser admin badge o logo con nombres */}
        <Skeleton className="h-10 w-40 rounded-md" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </header>
  );
}
