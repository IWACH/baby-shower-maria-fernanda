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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-50 dark:from-purple-200/20 dark:via-pink-200/15 dark:to-purple-200/20 backdrop-blur-xl border-b border-purple-200/50 dark:border-purple-300/20 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-10 h-10 rounded-full bg-purple-200/50 dark:bg-purple-300/20 flex items-center justify-center"
          >
            <Home className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </motion.div>
          <div>
            <span className="font-serif text-2xl font-medium text-purple-900 dark:text-purple-200">
              Diana & Fernando
            </span>
            <p className="text-xs text-purple-700/70 dark:text-purple-300/60">Baby Shower de María Fernanda</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isAdmin && <AdminBadge />}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-purple-200/10 border border-purple-300 dark:border-purple-300/30 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-300 animate-pulse" />
            <span className="text-sm text-purple-950 dark:text-purple-200 font-semibold">
              Hola, {userName}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            title="Cerrar sesión"
            className="bg-purple-100/60 dark:bg-purple-200/10 border-purple-200 dark:border-purple-300/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200/80 dark:hover:bg-purple-200/20 hover:text-purple-900 dark:hover:text-purple-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
