"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AdminBadge } from "@/app/components/admin/admin-badge";

interface HeaderClientProps {
  initialUser: { name: string; email: string } | null;
}

export function HeaderClient({ initialUser }: HeaderClientProps) {
  const [user, setUser] = useState(initialUser);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("hs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error al analizar el usuario desde localStorage", e);
      }
    }
  }, []);

  const isAdmin = user?.email?.toLowerCase() === "admin@admin.com" && 
                  user?.name?.toLowerCase() === "admin";

  if (!isMounted) {
    return null; // No renderizar nada hasta que se monte en el cliente
  }

  return (
    <div className="flex items-center gap-4">
      <ModeToggle />
      {isAdmin && <AdminBadge />}
      {user && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-foreground font-medium">
            Hola, {user.name}
          </span>
        </div>
      )}
      {user && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            localStorage.removeItem("hs_user");
            // Borrar cookie de autenticación
            document.cookie = "hs_auth=; path=/; max-age=0";
            // Enviar al login
            window.location.href = "/login";
          }}
          title="Cerrar sesión"
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
