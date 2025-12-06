"use client";

import { Loader2, XCircle } from "lucide-react";

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

interface UnreserveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gift: Product | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function UnreserveModal({
  open,
  onOpenChange,
  gift,
  onConfirm,
  isLoading = false,
}: UnreserveModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-orange-600 dark:text-orange-400 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            ¿Cancelar tu reserva?
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Estás a punto de cancelar tu reserva de
            <br />
            <strong className="text-foreground">{gift?.title}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 space-y-3 text-sm text-muted-foreground">
          <p>
            Al cancelar, este regalo quedará disponible nuevamente para que otros
            invitados puedan reservarlo.
          </p>
          <p className="text-foreground font-medium">
            ¿Estás segur@ de que deseas cancelar esta reserva?
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            No, mantener reserva
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelando...
              </>
            ) : (
              "Sí, cancelar reserva"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
