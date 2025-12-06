"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  ProductFormModal,
  type ProductFormData,
} from "@/app/components/admin/product-form-modal";
import { LoginScreen } from "@/app/components/auth/login-screen";
import { GiftListInteractive } from "@/app/components/gifts/gift-list-interactive";
import { GiftListSkeleton } from "@/app/components/gifts/gift-card-skeleton";
import { EmptyState } from "@/app/components/layout/empty-state";
import { SearchAndFilters } from "@/app/components/layout/search-and-filters";
import { SearchFiltersSkeleton } from "@/app/components/layout/search-filters-skeleton";
import { DeleteConfirmModal } from "@/app/components/modals/delete-confirm-modal";
import { ReserveModal } from "@/app/components/modals/reserve-modal";
import { UnreserveModal } from "@/app/components/modals/unreserve-modal";
import { WelcomeModal } from "@/app/components/modals/welcome-modal";
import { useProducts, type Product } from "@/app/hooks/use-products";
import { Button } from "@/components/ui/button";

// Types
interface User {
  name: string;
  email: string;
}

// Constantes de admin
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_NAME = "admin";

interface RegistryHybridProps {
  initialProducts: Product[];
}

// Este es un wrapper ligero que agrega interactividad progresivamente
export function RegistryHybrid({ initialProducts }: RegistryHybridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [unreserveModalOpen, setUnreserveModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Product | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [isUnreserving, setIsUnreserving] = useState(false);

  // Admin State
  const isAdmin =
    user?.email.toLowerCase() === ADMIN_EMAIL &&
    user?.name.toLowerCase() === ADMIN_NAME;

  // Product Form Modal State
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  // Products Hook - Inicializado con los productos del servidor
  const {
    products: gifts,
    createProduct,
    updateProduct,
    deleteProduct,
    reserveProduct,
    unreserveProduct,
  } = useProducts(initialProducts);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by reservation status
  const [reservationFilter, setReservationFilter] = useState<
    "all" | "available" | "reserved"
  >("all");

  // Cargar usuario desde localStorage después del montaje
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("hs_user");
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Mostrar el modal de bienvenida solo si es la primera vez
        if (!hasSeenWelcome) {
          setWelcomeOpen(true);
          localStorage.setItem("hasSeenWelcome", "true");
        }
      } catch (e) {
        console.error("Error al analizar el usuario desde localStorage", e);
      }
    }
  }, []);

  // Filter gifts based on search and reservation status
  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const matchesSearch = gift.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesReservation =
        reservationFilter === "all" ||
        (reservationFilter === "available" && !gift.isReserved) ||
        (reservationFilter === "reserved" && gift.isReserved);

      return matchesSearch && matchesReservation;
    });
  }, [gifts, searchQuery, reservationFilter]);

  // Confetti effect
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleLogin = (name: string, email: string) => {
    const newUser = { name, email };
    localStorage.setItem("hs_user", JSON.stringify(newUser));
    setUser(newUser);

    // Solo mostrar el modal de bienvenida si NO es admin
    const isUserAdmin =
      newUser.email.toLowerCase() === ADMIN_EMAIL &&
      newUser.name.toLowerCase() === ADMIN_NAME;

    if (!isUserAdmin) {
      setWelcomeOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hs_user");
    setUser(null);
  };

  const openReserveModal = (gift: Product) => {
    setSelectedGift(gift);
    setReserveModalOpen(true);
  };

  const confirmReservation = async () => {
    if (!selectedGift || !user) return;

    setIsReserving(true);
    try {
      await reserveProduct(selectedGift.id, user.email);

      setReserveModalOpen(false);
      setSelectedGift(null);
      triggerConfetti();
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Error al reservar el producto");
    } finally {
      setIsReserving(false);
    }
  };

  const openUnreserveModal = (gift: Product) => {
    setSelectedGift(gift);
    setUnreserveModalOpen(true);
  };

  const confirmUnreservation = async () => {
    if (!selectedGift) return;

    setIsUnreserving(true);
    try {
      await unreserveProduct(selectedGift.id);

      setUnreserveModalOpen(false);
      setSelectedGift(null);
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("Error al cancelar la reserva");
    } finally {
      setIsUnreserving(false);
    }
  };

  // Admin Functions
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setProductFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeletingProduct(true);
    try {
      const result = await deleteProduct(productToDelete.id);

      if (result.success) {
        setDeleteConfirmOpen(false);
        setProductToDelete(null);
      } else {
        console.error("Error al eliminar:", result.error);
        alert(`Error al eliminar producto: ${result.error}`);
      }
    } catch (error) {
      console.error("Error inesperado al eliminar:", error);
      alert("Error inesperado al eliminar el producto");
    } finally {
      setIsDeletingProduct(false);
    }
  };

  const handleProductFormSubmit = async (
    data: ProductFormData
  ): Promise<void> => {
    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, data);
    } else {
      result = await createProduct(data);
    }

    if (result.success) {
      setProductFormOpen(false);
      setEditingProduct(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setReservationFilter("all");
  };

  // Si no hay usuario y ya está montado, mostrar login
  if (isMounted && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <>
      {/* Search & Filters: Skeleton solo mientras no está montado */}
      {!isMounted ? (
        <SearchFiltersSkeleton />
      ) : (
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          reservationFilter={reservationFilter}
          onFilterChange={setReservationFilter}
          totalGifts={gifts.length}
          availableGifts={gifts.filter((g) => !g.isReserved).length}
          reservedGifts={gifts.filter((g) => g.isReserved).length}
          filteredCount={filteredGifts.length}
          showResultsCount={searchQuery !== "" || reservationFilter !== "all"}
        />
      )}

      {/* Admin: Create Product Button */}
      {isAdmin && isMounted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <Button
            onClick={handleCreateProduct}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Nuevo Producto
          </Button>
        </motion.div>
      )}

      {/* Gifts Grid - Siempre la versión interactiva una vez montado */}
      {initialProducts.length === 0 ? (
        <GiftListSkeleton count={8} />
      ) : (
        <GiftListInteractive
          products={gifts}
          filteredProducts={isMounted ? filteredGifts : initialProducts}
          isAdmin={isAdmin}
          currentUserEmail={user?.email || ""}
          onReserve={openReserveModal}
          onUnreserve={openUnreserveModal}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Empty State - Solo con JS y cuando hay filtros activos */}
      {isMounted && filteredGifts.length === 0 && gifts.length > 0 && (
        <EmptyState onClearFilters={handleClearFilters} />
      )}

      {/* MODALS - Solo aparecen con JS */}
      <WelcomeModal open={welcomeOpen} onOpenChange={setWelcomeOpen} />

      <ReserveModal
        open={reserveModalOpen}
        onOpenChange={setReserveModalOpen}
        gift={selectedGift}
        onConfirm={confirmReservation}
        isLoading={isReserving}
      />

      <UnreserveModal
        open={unreserveModalOpen}
        onOpenChange={setUnreserveModalOpen}
        gift={selectedGift}
        onConfirm={confirmUnreservation}
        isLoading={isUnreserving}
      />

      {isAdmin && (
        <>
          <ProductFormModal
            open={productFormOpen}
            onOpenChange={setProductFormOpen}
            onSubmit={handleProductFormSubmit}
            initialData={
              editingProduct
                ? {
                    title: editingProduct.title,
                    image: editingProduct.image,
                    url: editingProduct.url,
                  }
                : undefined
            }
            mode={editingProduct ? "edit" : "create"}
          />

          <DeleteConfirmModal
            open={deleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
            product={productToDelete}
            onConfirm={confirmDelete}
            isDeleting={isDeletingProduct}
          />
        </>
      )}
    </>
  );
}
