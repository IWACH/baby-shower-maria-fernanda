// API Service para el backend de HouseShower
// Basado en la documentación de integration-back.md

import { config } from "../config/config";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface ProductoAPI {
  id: number;
  title: string;
  image: string;
  url: string;
  email: string | null;
  isReserved: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CreateProductoPayload {
  title: string;
  image: string;
  url: string;
  email?: string | null;
  type: string;
}

export interface UpdateProductoPayload {
  title: string;
  image: string;
  url: string;
  email?: string | null;
  type: string;
}

/**
 * GET /api/productos/
 * Lista todos los productos con paginación
 */
export async function getProductos(): Promise<PaginatedResponse<ProductoAPI>> {
  const response = await fetch(
    `${API_BASE_URL}/api/productos?type=${config.projectName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * GET /api/productos/{id}/
 * Obtiene un producto específico
 */
export async function getProducto(id: number): Promise<ProductoAPI> {
  const response = await fetch(`${API_BASE_URL}/api/productos/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Producto no encontrado");
    }
    throw new Error(`Error al obtener producto: ${response.statusText}`);
  }

  return response.json();
}

/**
 * POST /api/productos/
 * Crea un nuevo producto
 */
export async function createProducto(
  data: CreateProductoPayload
): Promise<ProductoAPI> {
  const response = await fetch(`${API_BASE_URL}/api/productos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
}

/**
 * PUT /api/productos/{id}/
 * Actualiza completamente un producto
 */
export async function updateProducto(
  id: number,
  data: UpdateProductoPayload
): Promise<ProductoAPI> {
  const response = await fetch(`${API_BASE_URL}/api/productos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
}

/**
 * PATCH /api/productos/{id}/
 * Actualiza parcialmente un producto
 */
export async function patchProducto(
  id: number,
  data: Partial<UpdateProductoPayload>
): Promise<ProductoAPI> {
  const response = await fetch(`${API_BASE_URL}/api/productos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
}

/**
 * DELETE /api/productos/{id}/
 * Elimina un producto
 */
export async function deleteProducto(id: number): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/productos/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Producto no encontrado");
    }
    throw new Error(`Error al eliminar producto: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper: Reservar producto (actualiza el email)
 */
export async function reservarProducto(
  id: number,
  email: string
): Promise<ProductoAPI> {
  return patchProducto(id, { email });
}

/**
 * Helper: Des-reservar producto (elimina el email)
 */
export async function desreservarProducto(id: number): Promise<ProductoAPI> {
  return patchProducto(id, { email: null });
}
