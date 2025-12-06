// Server Component - Se renderiza en el servidor
import Image from "next/image";
import { ExternalLink, Gift, Heart } from "lucide-react";

import type { Product } from "@/app/hooks/use-products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GiftListServerProps {
  products: Product[];
}

export function GiftListServer({ products }: GiftListServerProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      {products.map((gift) => (
        <Card
          key={gift.id}
          className={cn(
            "h-full flex flex-col overflow-hidden border-none shadow-lg transition-all duration-500",
            gift.isReserved
              ? "opacity-70 bg-muted/80"
              : "bg-card/80 backdrop-blur-sm"
          )}
        >
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <Image
              src={gift.image || "/placeholder.svg"}
              alt={gift.title}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
            {gift.isReserved && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 flex items-center justify-center p-4">
                <span className="bg-card text-card-foreground px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xl max-w-full text-center">
                  <Heart className="w-4 h-4 fill-red-400 text-red-400 flex-shrink-0" />
                  <span className="truncate">Reservado</span>
                </span>
              </div>
            )}
          </div>

          <CardHeader className="flex-grow">
            <CardTitle className="font-serif text-base md:text-lg leading-tight">
              {gift.title}
            </CardTitle>
          </CardHeader>

          <CardFooter className="flex flex-col gap-2 pt-0">
            <Button
              variant="outline"
              className="w-full gap-2 bg-transparent"
              asChild
            >
              <a
                href={gift.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Producto <ExternalLink className="w-4 h-4" />
              </a>
            </Button>

            <Button
              className={cn(
                "w-full transition-all duration-300",
                gift.isReserved
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primary/80 text-white"
              )}
              disabled={gift.isReserved}
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
