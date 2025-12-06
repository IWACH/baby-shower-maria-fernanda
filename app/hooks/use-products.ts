"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import * as api from "@/app/lib/api";

export interface Product {
  id: number;
  title: string;
  image: string;
  url: string;
  isReserved: boolean;
  email?: string;
  type?: string;
}

export interface CreateProductDTO {
  title: string;
  image: File | string;
  url: string;
}

export interface UpdateProductDTO {
  title: string;
  image: File | string;
  url: string;
  isReserved?: boolean;
  email?: string;
}

// Helper para subir imágenes a Vercel Blob
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al subir la imagen");
  }

  const data = await response.json();
  return data.url;
}

// Hook para manejar operaciones de productos (preparado para APIs)
export function useProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CREATE - Crear nuevo producto
  const createProduct = useCallback(async (data: CreateProductDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      // Si la imagen es un archivo, subirla primero
      let imageUrl: string;
      if (data.image instanceof File) {
        imageUrl = await uploadImage(data.image);
      } else {
        imageUrl = data.image;
      }

      console.log("➕ Creando nuevo producto:", data.title);

      // Llamar a la API para crear el producto
      const apiProduct = await api.createProducto({
        title: data.title,
        url: data.url,
        image: imageUrl,
      });

      console.log("✅ Producto creado en API - ID:", apiProduct.id, "Tipo:", typeof apiProduct.id);

      // Convertir de ProductoAPI a Product
      const newProduct: Product = {
        id: apiProduct.id,
        title: apiProduct.title,
        image: apiProduct.image,
        url: apiProduct.url,
        isReserved: apiProduct.isReserved,
        email: apiProduct.email || undefined,
      };

      setProducts((prev) => {
        const updated = [...prev, newProduct];
        console.log("📊 Productos después de crear:", updated.length);
        return updated;
      });

      toast.success("Producto creado exitosamente");
      return { success: true, product: newProduct };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear producto";
      console.error("❌ Error al crear producto:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // UPDATE - Actualizar producto existente
  const updateProduct = useCallback(
    async (id: number, data: UpdateProductDTO) => {
      setIsLoading(true);
      setError(null);
      try {
        // Si la imagen es un archivo, subirla primero
        let imageUrl: string;
        if (data.image instanceof File) {
          imageUrl = await uploadImage(data.image);
        } else {
          imageUrl = data.image;
        }

        // Llamar a la API para actualizar el producto
        const apiProduct = await api.updateProducto(id, {
          title: data.title,
          url: data.url,
          image: imageUrl,
          email: data.email || null,
        });

        // Convertir de ProductoAPI a Product
        const updatedProduct: Product = {
          id: apiProduct.id,
          title: apiProduct.title,
          image: apiProduct.image,
          url: apiProduct.url,
          isReserved: apiProduct.isReserved,
          email: apiProduct.email || undefined,
        };

        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
        toast.success("Producto actualizado exitosamente");
        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al actualizar producto";
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // DELETE - Eliminar producto
  const deleteProduct = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("🗑️ Eliminando producto con ID:", id, "Tipo:", typeof id);

      // Llamar a la API para eliminar el producto
      await api.deleteProducto(id);

      console.log("✅ Producto eliminado de la API, actualizando estado local...");

      // Actualizar estado local
      setProducts((prev) => {
        const filtered = prev.filter((product) => {
          const keep = product.id !== id;
          if (!keep) {
            console.log("🔍 Removiendo producto:", product.id, product.title);
          }
          return keep;
        });
        console.log("📊 Productos antes:", prev.length, "Productos después:", filtered.length);
        return filtered;
      });

      toast.success("Producto eliminado exitosamente");
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al eliminar producto";
      console.error("❌ Error al eliminar producto:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // RESERVE - Reservar producto
  const reserveProduct = useCallback(async (id: number, email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Llamar a la API para reservar el producto
      const apiProduct = await api.reservarProducto(id, email);

      // Convertir de ProductoAPI a Product
      const reservedProduct: Product = {
        id: apiProduct.id,
        title: apiProduct.title,
        image: apiProduct.image,
        url: apiProduct.url,
        isReserved: apiProduct.isReserved,
        email: apiProduct.email || undefined,
      };

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? reservedProduct : product
        )
      );
      toast.success("Reservado exitosamente");
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al reservar producto";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // UNRESERVE - Cancelar reserva de producto
  const unreserveProduct = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Llamar a la API para des-reservar el producto
      const apiProduct = await api.desreservarProducto(id);

      // Convertir de ProductoAPI a Product
      const unreservedProduct: Product = {
        id: apiProduct.id,
        title: apiProduct.title,
        image: apiProduct.image,
        url: apiProduct.url,
        isReserved: apiProduct.isReserved,
        email: apiProduct.email || undefined,
      };

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? unreservedProduct : product
        )
      );
      toast.success("Reserva cancelada exitosamente");
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cancelar reserva";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // LOAD - Cargar todos los productos desde la API
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getProductos();

      console.log("📥 Productos recibidos de la API:", response.results.length);

      // Convertir todos los ProductoAPI a Product
      const loadedProducts: Product[] = response.results.map((apiProduct) => {
        // Asegurar que el ID sea un número
        const numericId = typeof apiProduct.id === 'string' ? parseInt(apiProduct.id, 10) : apiProduct.id;
        console.log("🔍 Producto cargado - ID:", numericId, "Tipo:", typeof numericId, "Título:", apiProduct.title);
        return {
          id: numericId,
          title: apiProduct.title,
          image: apiProduct.image,
          url: apiProduct.url,
          isReserved: apiProduct.isReserved,
          email: apiProduct.email || undefined,
        };
      });

      setProducts(loadedProducts);
      console.log("✅ Productos cargados en estado:", loadedProducts.length);
      return { success: true, products: loadedProducts };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar productos";
      console.error("❌ Error al cargar productos:", errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage, products: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    isLoading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    reserveProduct,
    unreserveProduct,
  };
}
