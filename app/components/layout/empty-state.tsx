"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
        <Search className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-serif mb-2 text-foreground">
        No se encontraron regalos
      </h3>
      <p className="text-muted-foreground mb-6">
        Intenta ajustar tu búsqueda o filtros
      </p>
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="bg-card hover:bg-primary/5"
      >
        Limpiar Filtros
      </Button>
    </motion.div>
  );
}
