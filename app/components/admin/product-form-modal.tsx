"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDialog } from "@/components/form-dialog";
import { FormInput } from "@/components/form-input";
import { FormImageUpload } from "@/components/form-image-upload";

// Esquema de validación Zod para productos
const productSchema = z.object({
  title: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  image: z.union([
    z.instanceof(File, { message: "La imagen es requerida" }),
    z.string().url("Debe ser una URL válida"),
  ]),
  url: z
    .string()
    .min(1, "La URL del producto es requerida")
    .url("Debe ser una URL válida"),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: ProductFormData;
  mode: "create" | "edit";
}

export function ProductFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: ProductFormModalProps) {
  const isEditing = mode === "edit";
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      image: "",
      url: "",
    },
  });

  const { reset } = form;

  const handleSubmit = async (data: ProductFormData) => {
    setIsPending(true);
    try {
      await onSubmit(data);
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    } finally {
      setIsPending(false);
    }
  };

  const labelTitle = isEditing ? "Editar Producto" : "Crear Nuevo Producto";
  const labelDescription = isEditing
    ? "Modifica los datos del producto."
    : "Completa los datos del nuevo producto para agregarlo a la lista.";

  useEffect(() => {
    if (initialData && open) {
      reset({
        title: initialData.title,
        image: initialData.image,
        url: initialData.url,
      });
    } else if (open && !initialData) {
      reset({
        title: "",
        image: "",
        url: "",
      });
    }
  }, [initialData, open, reset]);

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={labelTitle}
      description={labelDescription}
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      isEditing={isEditing}
      submitLabel={isEditing ? "Guardar Cambios" : "Crear Producto"}
      maxWidth="lg"
    >
      <FormInput
        name="title"
        label="Nombre del Producto"
        placeholder="Ej: Juego de Copas de Vino"
        required
        disabled={isPending}
      />

      <FormImageUpload
        name="image"
        label="Imagen del Producto"
        required
        disabled={isPending}
      />

      <FormInput
        name="url"
        label="URL del Producto"
        placeholder="https://www.amazon.com/..."
        type="url"
        required
        disabled={isPending}
      />
    </FormDialog>
  );
}
