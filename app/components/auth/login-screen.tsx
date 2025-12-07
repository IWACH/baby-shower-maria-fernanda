"use client";

import type React from "react";

import { Baby, Heart, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Zod Schema for form validation
const loginSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      "El nombre solo puede contener letras"
    ),
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("El formato del correo no es válido"),
});

interface LoginScreenProps {
  onLogin: (name: string, email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");

    // Validate with Zod
    const result = loginSchema.safeParse({
      name: nameInput.trim(),
      email: emailInput.trim(),
    });

    if (!result.success) {
      // Extract errors
      const errors = result.error.flatten().fieldErrors;
      if (errors.name) setNameError(errors.name[0]);
      if (errors.email) setEmailError(errors.email[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      onLogin(nameInput.trim(), emailInput.trim());
    } catch (error) {
      // En caso de error inesperado, permitimos reintentar
      console.error("Error durante el login", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-violet-100 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-background">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>

      {/* Background Elements - Tonos rosados y morados pasteles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-100/20 dark:bg-violet-600/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Hero Section - María Fernanda como protagonista */}
        <div className="text-center mb-8">
          {/* Decoración superior */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-300 to-purple-300 dark:via-pink-700 dark:to-purple-700" />
            <Sparkles className="w-5 h-5 text-purple-400 dark:text-purple-300 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-300 to-pink-300 dark:via-purple-700 dark:to-pink-700" />
          </div>

          {/* Título principal con María Fernanda destacada */}
          <div className="mb-6 space-y-3">
            <h2 className="text-2xl font-serif bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 dark:from-pink-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent tracking-wide">
              Baby Shower
            </h2>

            {/* NOMBRE DESTACADO - María Fernanda como protagonista */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-2 relative">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500 dark:from-pink-300 dark:via-purple-300 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
                María Fernanda
              </span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-base bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 dark:from-pink-300 dark:via-purple-300 dark:to-violet-300 bg-clip-text text-transparent font-light">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400 dark:fill-pink-300 dark:text-pink-300" />
              <span>Nuestra princesa está en camino</span>
              <Heart className="w-4 h-4 fill-purple-400 text-purple-400 dark:fill-purple-300 dark:text-purple-300" />
            </div>
          </div>

          {/* Decoración inferior con ícono del bebé integrado */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-300 to-purple-300 dark:via-pink-700 dark:to-purple-700" />
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-200/60 via-purple-200/60 to-violet-200/60 dark:from-pink-500/15 dark:via-purple-500/15 dark:to-violet-500/15 border-2 border-purple-300/50 dark:border-purple-700/50">
              <Baby className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-300 to-pink-300 dark:via-purple-700 dark:to-pink-700" />
          </div>
        </div>

        <div>
          <Card className="border-2 border-purple-200/50 dark:border-purple-800/30 shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-2xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 dark:from-pink-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                ¡Bienvenid@!
              </CardTitle>
              <CardDescription className="text-center text-base text-purple-600/80 dark:text-purple-400/80">
                Ingresa tus datos para ver la lista de regalos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={nameInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Solo permite letras, espacios y letras con acentos
                      // No permite espacios al inicio
                      if (
                        /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/.test(value) &&
                        !/^\s/.test(value)
                      ) {
                        setNameInput(value);
                        if (nameError) setNameError("");
                      }
                    }}
                    disabled={isSubmitting}
                    className={cn(
                      "bg-purple-50/50 dark:bg-background/50 border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-500 transition-all duration-300 h-11",
                      nameError &&
                        "border-red-300 dark:border-red-700 focus:border-red-400 dark:focus:border-red-600"
                    )}
                  />
                  {nameError && (
                    <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                      {nameError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="tu@correo.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    disabled={isSubmitting}
                    className={cn(
                      "bg-purple-50/50 dark:bg-background/50 border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-500 transition-all duration-300 h-11",
                      emailError &&
                        "border-red-300 dark:border-red-700 focus:border-red-400 dark:focus:border-red-600"
                    )}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                      {emailError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-medium h-11 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500 hover:from-pink-500 hover:via-purple-500 hover:to-violet-600 dark:from-pink-500 dark:via-purple-500 dark:to-violet-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ingresando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 dark:from-pink-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent mt-6 font-light">
          Hecho con{" "}
          <Heart className="inline w-4 h-4 fill-purple-400 text-purple-400 dark:fill-purple-300 dark:text-purple-300" />{" "}
          para Diana, Fernando y María Fernanda
        </p>
      </div>
    </div>
  );
}
