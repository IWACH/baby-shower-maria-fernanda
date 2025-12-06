"use client";

import { motion } from "framer-motion";
import { Home, LogOut } from "lucide-react";

import { AdminBadge } from "@/app/components/admin/admin-badge";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export function Header({ userName, isAdmin, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-accent/70 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
          >
            <Home className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <span className="font-serif text-2xl font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Yae&apos;s Depa
            </span>
            <p className="text-xs text-muted-foreground">Depa Shower</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isAdmin && <AdminBadge />}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-foreground font-medium">
              Hola, {userName}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            title="Cerrar sesión"
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
