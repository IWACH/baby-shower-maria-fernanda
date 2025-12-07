"use client";

import { Baby } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminBadge } from "@/app/components/admin/admin-badge";

const HeaderClient = dynamic(
  () => import("./header-client").then((mod) => mod.HeaderClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    )
  }
);

interface User {
  name: string;
  email: string;
}

export function HeaderWithAuth() {
  // En el cliente, obtenemos el usuario del localStorage
  const user = typeof window !== 'undefined' ?
    JSON.parse(localStorage.getItem("hs_user") || 'null') :
    null;

  const isAdmin = user?.email?.toLowerCase() === "admin@admin.com" &&
                  user?.name?.toLowerCase() === "admin";

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-background via-muted to-background dark:from-background dark:via-muted/20 dark:to-background backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {isAdmin ? (
          <AdminBadge />
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/20 flex items-center justify-center">
              <Baby className="w-5 h-5 text-primary dark:text-primary" />
            </div>
            <div>
              <span className="font-serif text-2xl font-medium text-foreground dark:text-foreground">
                Diana & Fernando
              </span>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">Baby Shower de María Fernanda</p>
            </div>
          </div>
        )}

        <Suspense fallback={
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        }>
          <HeaderClient initialUser={user} />
        </Suspense>
      </div>
    </header>
  );
}
