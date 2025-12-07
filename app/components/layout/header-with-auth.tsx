"use client";

import { Baby } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-50 dark:from-purple-200/20 dark:via-pink-200/15 dark:to-purple-200/20 backdrop-blur-xl border-b border-purple-200/50 dark:border-purple-300/20 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-200/50 dark:bg-purple-300/20 flex items-center justify-center">
            <Baby className="w-5 h-5 text-purple-600 dark:text-pink-300" />
          </div>
          <div>
            <span className="font-serif text-2xl font-medium text-purple-900 dark:text-purple-200">
              Diana & Fernando
            </span>
            <p className="text-xs text-purple-700/70 dark:text-purple-300/60">Baby Shower de María Fernanda</p>
          </div>
        </div>
        
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
