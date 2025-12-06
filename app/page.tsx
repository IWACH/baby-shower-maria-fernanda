import { Suspense } from "react";
import { RegistryHybrid } from "@/app/components/registry-hybrid";
import { HeroSectionServer } from "@/app/components/layout/hero-section-server";
import { Footer } from "@/app/components/layout/footer";
import { HeaderWithAuth } from "@/app/components/layout/header-with-auth";
import { loadProductsFromServer } from "@/app/lib/server-api";
import { Skeleton } from "@/components/ui/skeleton";

// Componente Skeleton para el header
function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-accent/70 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-3 w-20" />
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

// Server Component - Se ejecuta en el servidor
export default async function HouseShowerRegistry() {
  // Cargar productos desde el servidor
  const initialProducts = await loadProductsFromServer();

  return (
    <div className="min-h-dvh bg-background">
      {/* Header con Suspense */}
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderWithAuth />
      </Suspense>

      <main className="container mx-auto px-4 py-8 pb-16">
        {/* Hero renderizado en el servidor */}
        <HeroSectionServer />

        {/* Componente con la funcionalidad principal */}
        <RegistryHybrid initialProducts={initialProducts} />
      </main>

      {/* Footer renderizado en el servidor */}
      <Footer />
    </div>
  );
}
