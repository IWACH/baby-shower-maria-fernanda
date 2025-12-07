"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

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
      {user && !isAdmin && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-purple-200/10 border border-purple-300 dark:border-purple-300/30 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-300 animate-pulse" />
          <span className="text-sm text-purple-950 dark:text-purple-200 font-semibold">
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
          className="bg-purple-100/60 dark:bg-purple-200/10 border-purple-200 dark:border-purple-300/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200/80 dark:hover:bg-purple-200/20 hover:text-purple-900 dark:hover:text-purple-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
