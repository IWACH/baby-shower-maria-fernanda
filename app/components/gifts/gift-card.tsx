"use client";

import { Edit, ExternalLink, Gift, Heart, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { Product } from "@/app/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GiftCardProps {
  index?: number;
  gift: Product;
  isAdmin: boolean;
  currentUserEmail: string;
  onReserve: (gift: Product) => void;
  onUnreserve: (gift: Product) => void;
  onEdit?: (gift: Product) => void;
  onDelete?: (gift: Product) => void;
}

export function GiftCard({
  index,
  gift,
  isAdmin,
  currentUserEmail,
  onReserve,
  onUnreserve,
  onEdit,
  onDelete,
}: GiftCardProps) {
  const [mounted, setMounted] = useState(false);
  const isReservedByCurrentUser =
    gift.isReserved && gift.email === currentUserEmail;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card
      key={index}
      className={cn(
        "group h-full flex flex-col overflow-hidden border-none shadow-lg transition-all duration-500 pt-0",
        gift.isReserved
          ? "opacity-70 bg-muted/80"
          : "hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 bg-card/80 backdrop-blur-sm"
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary rounded-t-xl">
        <Image
          src={gift.image || "/placeholder.svg"}
          alt={gift.title}
          width={500}
          height={500}
          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {gift.isReserved && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 flex items-center justify-center p-4">
            <span className="bg-card text-card-foreground px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xl max-w-full text-center">
              <Heart className="w-4 h-4 fill-red-400 text-red-400 animate-pulse flex-shrink-0" />
              <span className="truncate">
                {isReservedByCurrentUser ? "Reservado por ti" : "Reservado"}
              </span>
            </span>
          </div>
        )}
        {!gift.isReserved && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="font-serif text-base md:text-lg leading-tight group-hover:text-primary transition-colors duration-300">
          {gift.title}
        </CardTitle>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2 pt-0">
        {!mounted ? (
          // Skeletons mientras carga el cliente
          <>
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </>
        ) : isAdmin ? (
          // Admin: Solo botones de Editar y Eliminar
          <>
            <Button
              variant="outline"
              className="w-full gap-2 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
              onClick={() => onEdit?.(gift)}
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all duration-300"
              onClick={() => onDelete?.(gift)}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </Button>
          </>
        ) : (
          // Usuario normal: Ver producto, Reservar o Des-reservar
          <>
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-primary/10 hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300"
              asChild
            >
              <a href={gift.url} target="_blank" rel="noopener noreferrer">
                Ver Producto <ExternalLink className="w-4 h-4" />
              </a>
            </Button>

            {isReservedByCurrentUser ? (
              // Botón para des-reservar (solo si el usuario actual lo reservó)
              <Button
                variant="outline"
                className="w-full gap-2 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                onClick={() => onUnreserve(gift)}
              >
                Cancelar Reserva
              </Button>
            ) : (
              // Botón para reservar o mostrar que está reservado
              <Button
                className={cn(
                  "w-full transition-all duration-300",
                  gift.isReserved
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                )}
                disabled={gift.isReserved}
                onClick={() => onReserve(gift)}
              >
                {gift.isReserved ? (
                  <>
                    <Heart className="w-4 h-4 fill-current mr-2" />
                    Reservado
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Reservar
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
