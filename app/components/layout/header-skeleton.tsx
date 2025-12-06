import { Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-accent/70 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-serif text-2xl font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Diana & Fernando
            </span>
            <p className="text-xs text-muted-foreground">Baby Shower de María Fernanda</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </header>
  );
}
