"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  ProductFormModal,
  type ProductFormData,
} from "@/app/components/admin/product-form-modal";
import { LoginScreen } from "@/app/components/auth/login-screen";
import { GiftCard } from "@/app/components/gifts/gift-card";
import { EmptyState } from "@/app/components/layout/empty-state";
import { Footer } from "@/app/components/layout/footer";
import { Header } from "@/app/components/layout/header";
import { HeroSection } from "@/app/components/layout/hero-section";
import { SearchAndFilters } from "@/app/components/layout/search-and-filters";
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

interface RegistryClientProps {
  initialProducts: Product[];
}

export function RegistryClient({ initialProducts }: RegistryClientProps) {
  const [mounted, setMounted] = useState(false);
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
    unreserveProduct,
  } = useProducts(initialProducts);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by reservation status
  const [reservationFilter, setReservationFilter] = useState<
    "all" | "available" | "reserved"
  >("all");

  // Load user from localStorage after mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("hs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
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

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return null; // O un skeleton/loading state
  }

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
      // Llamar a la API para reservar producto (actualizar email)
      await updateProduct(selectedGift.id, {
        ...selectedGift,
        email: user.email,
      });

      setReserveModalOpen(false);
      setSelectedGift(null);

      // Trigger confetti celebration!
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
      // Llamar a la API para des-reservar producto
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
        // Cerrar modal solo si la eliminación fue exitosa
        setDeleteConfirmOpen(false);
        setProductToDelete(null);
      } else {
        // Mostrar error si falló
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
      // Editar producto existente
      result = await updateProduct(editingProduct.id, data);
    } else {
      // Crear nuevo producto
      result = await createProduct(data);
    }

    // Solo cerrar el modal si la operación fue exitosa
    if (result.success) {
      setProductFormOpen(false);
      setEditingProduct(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setReservationFilter("all");
  };

  // ----------------------------------------------------------------------
  // VIEW: LOGIN SCREEN
  // ----------------------------------------------------------------------
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ----------------------------------------------------------------------
  // VIEW: MAIN LIST
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-dvh bg-background">
      <Header userName={user.name} isAdmin={isAdmin} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 pb-16">
        <HeroSection />

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

        {/* Admin: Create Product Button */}
        {isAdmin && (
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

        {/* Gifts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredGifts.map((gift, index) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                index={index}
                isAdmin={isAdmin}
                currentUserEmail={user.email}
                onReserve={openReserveModal}
                onUnreserve={openUnreserveModal}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredGifts.length === 0 && (
          <EmptyState onClearFilters={handleClearFilters} />
        )}
      </main>

      <Footer />

      {/* MODALS */}
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

      {/* PRODUCT FORM MODAL (Admin Only) */}
      {isAdmin && (
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
      )}

      {/* DELETE CONFIRMATION MODAL (Admin Only) */}
      {isAdmin && (
        <DeleteConfirmModal
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          product={productToDelete}
          onConfirm={confirmDelete}
          isDeleting={isDeletingProduct}
        />
      )}
    </div>
  );
}
