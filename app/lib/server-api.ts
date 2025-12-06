// Server-side API functions (no usar "use client")
// Estas funciones se ejecutan solo en el servidor

import type { Product } from "@/app/hooks/use-products";
import type { PaginatedResponse, ProductoAPI } from "./api";
import { config } from "../config/config";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Server-side function to load products
 * Esta función se ejecuta en el servidor durante SSR
 */
export async function loadProductsFromServer(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/productos?type=${config.projectName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Sin caché - siempre datos frescos
      }
    );

    if (!response.ok) {
      console.error(`Error al obtener productos: ${response.statusText}`);
      return [];
    }

    const data: PaginatedResponse<ProductoAPI> = await response.json();

    // Convertir ProductoAPI a Product
    const products: Product[] = data.results.map((apiProduct) => {
      const numericId =
        typeof apiProduct.id === "string"
          ? parseInt(apiProduct.id, 10)
          : apiProduct.id;
      return {
        id: numericId,
        title: apiProduct.title,
        image: apiProduct.image,
        url: apiProduct.url,
        isReserved: apiProduct.isReserved,
        email: apiProduct.email || undefined,
      };
    });

    return products;
  } catch (error) {
    console.error("Error al cargar productos desde servidor:", error);
    return [];
  }
}
