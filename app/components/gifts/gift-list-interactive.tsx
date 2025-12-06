"use client";

import { GiftCard } from "@/app/components/gifts/gift-card";
import type { Product } from "@/app/hooks/use-products";

interface GiftListInteractiveProps {
  products: Product[];
  isAdmin: boolean;
  currentUserEmail: string;
  filteredProducts: Product[];
  onReserve: (gift: Product) => void;
  onUnreserve: (gift: Product) => void;
  onEdit?: (gift: Product) => void;
  onDelete?: (gift: Product) => void;
}

export function GiftListInteractive({
  isAdmin,
  currentUserEmail,
  filteredProducts,
  onReserve,
  onUnreserve,
  onEdit,
  onDelete,
}: GiftListInteractiveProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      {filteredProducts.map((gift, index) => (
        <GiftCard
          key={index}
          gift={gift}
          isAdmin={isAdmin}
          currentUserEmail={currentUserEmail}
          onReserve={onReserve}
          onUnreserve={onUnreserve}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
