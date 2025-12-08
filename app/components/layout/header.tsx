"use client";

import { motion } from "framer-motion";
import { Baby, LogOut } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-background via-muted to-background dark:from-background dark:via-muted/20 dark:to-background backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {isAdmin ? (
          <AdminBadge />
        ) : (
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/20 flex items-center justify-center"
            >
              <Baby className="w-5 h-5 text-accent dark:text-accent" />
            </motion.div>
            <div>
              <span className="font-serif text-2xl font-medium text-muted-foreground drop-shadow-sm">
                Diana & Fernando
              </span>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">Baby Shower de Maria Fernanda</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {!isAdmin && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 dark:bg-muted/10 border border-border/50 dark:border-border/30 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary dark:bg-primary animate-pulse" />
              <span className="text-sm text-foreground dark:text-foreground font-semibold">
                Hola, {userName}
              </span>
            </div>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            title="Cerrar sesión"
            className="bg-secondary/20 dark:bg-secondary/10 border-border dark:border-border text-foreground dark:text-foreground hover:bg-secondary/40 dark:hover:bg-secondary/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
