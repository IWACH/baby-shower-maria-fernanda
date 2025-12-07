"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, Heart, Search, Sparkles } from "lucide-react";

import type { Product } from "@/app/hooks/use-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  reservationFilter: "all" | "available" | "reserved";
  onFilterChange: (filter: "all" | "available" | "reserved") => void;
  totalGifts: number;
  availableGifts: number;
  reservedGifts: number;
  filteredCount: number;
  showResultsCount: boolean;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  reservationFilter,
  onFilterChange,
  totalGifts,
  availableGifts,
  reservedGifts,
  filteredCount,
  showResultsCount,
}: SearchAndFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-2xl mx-auto mb-10 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar regalo por nombre..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-border/40 focus:border-primary shadow-lg text-base"
        />
      </div>

      {/* Reservation Status Filter */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Filtrar por estado:
        </span>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={reservationFilter === "all" ? "default" : "outline"}
            onClick={() => onFilterChange("all")}
            className={cn(
              "transition-all duration-300 min-w-[120px]",
              reservationFilter === "all"
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg scale-105"
                : "hover:bg-primary/10 hover:border-primary hover:text-primary dark:hover:text-primary hover:scale-105"
            )}
          >
            <Gift className="w-4 h-4 mr-2" />
            Todos
            <Badge
              variant="secondary"
              className="ml-2 bg-white/20 text-white"
            >
              {totalGifts}
            </Badge>
          </Button>
          <Button
            variant={
              reservationFilter === "available" ? "default" : "outline"
            }
            onClick={() => onFilterChange("available")}
            className={cn(
              "transition-all duration-300 min-w-[120px]",
              reservationFilter === "available"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                : "hover:bg-green-500/10 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 hover:scale-105"
            )}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Disponibles
            <Badge
              variant="secondary"
              className={cn(
                "ml-2",
                reservationFilter === "available"
                  ? "bg-white/20 text-white"
                  : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
              )}
            >
              {availableGifts}
            </Badge>
          </Button>
          <Button
            variant={
              reservationFilter === "reserved" ? "default" : "outline"
            }
            onClick={() => onFilterChange("reserved")}
            className={cn(
              "transition-all duration-300 min-w-[120px]",
              reservationFilter === "reserved"
                ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg scale-105"
                : "hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-105"
            )}
          >
            <Heart className="w-4 h-4 mr-2" />
            Reservados
            <Badge
              variant="secondary"
              className={cn(
                "ml-2",
                reservationFilter === "reserved"
                  ? "bg-white/20 text-white"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
              )}
            >
              {reservedGifts}
            </Badge>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <AnimatePresence mode="wait">
        {showResultsCount && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm text-muted-foreground"
          >
            Mostrando {filteredCount} de {totalGifts} regalos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
