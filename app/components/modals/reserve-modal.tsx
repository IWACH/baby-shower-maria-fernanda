"use client";

import type { Product } from "@/app/hooks/use-products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ReserveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gift: Product | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ReserveModal({
  open,
  onOpenChange,
  gift,
  onConfirm,
  isLoading = false,
}: ReserveModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            ¿Confirmar reserva?
          </DialogTitle>
          <DialogDescription>
            Al reservar <strong>{gift?.title}</strong>, quedará marcado como <strong>No disponible</strong> para otros invitados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reservando...
              </>
            ) : (
              "Sí, elegir para Maria Fernanda 🎁"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
