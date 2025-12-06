import { Gift } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Gift className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-serif mb-2 text-foreground">
            Baby Shower
          </h1>
          <p className="text-muted-foreground">de María Fernanda</p>
          <p className="text-sm text-muted-foreground mt-4">Cargando productos...</p>
        </div>
      </div>
    </div>
  );
}
