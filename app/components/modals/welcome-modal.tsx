"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeModal({ open, onOpenChange }: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center pt-4">
            ¡Gracias por estar aquí! 💕
          </DialogTitle>
          <DialogDescription className="sr-only">
            Instrucciones para reservar regalos en el Baby Shower de María Fernanda
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 text-center text-muted-foreground leading-relaxed">
          <p>
            Al hacer clic en el botón{" "}
            <strong className="text-primary">Elegir para María Fernanda 🎁</strong> solo
            estarás reservando el regalo para que nadie más lo repita 💝.
          </p>
          <p>
            El obsequio podrás adquirirlo por tu cuenta, ya sea en el link de
            referencia o en la tienda de tu preferencia 🛍️, y entregarlo con
            mucho cariño el día del Baby Shower de María Fernanda 🎀💕.
          </p>
          <p className="font-medium text-foreground pt-2">
            ¡Gracias por tu cariño y por acompañarnos en este momento tan
            especial! 💕🫶
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            className="w-full sm:w-auto px-8 text-white"
            onClick={() => onOpenChange(false)}
          >
            Entendido, ¡vamos a ver! ✨
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
