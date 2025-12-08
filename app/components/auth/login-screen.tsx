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
    <div className="min-h-dvh flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary dark:from-background dark:via-muted/20 dark:to-background">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>

      {/* Background Elements - Baby Pink & Nudes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/30 dark:bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/20 dark:bg-secondary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Hero Section - María Fernanda como protagonista */}
        <div className="text-center mb-8">
          {/* Decoración superior */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-accent/50 dark:via-primary/50 dark:to-accent/50" />
            <Baby className="w-5 h-5 text-primary dark:text-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-primary/50 to-accent/50 dark:via-primary/50 dark:to-accent/50" />
          </div>

          {/* Título principal con María Fernanda destacada */}
          <div className="mb-6 space-y-3">
            <h2 className="text-2xl font-serif text-primary dark:text-primary tracking-wide">
              Baby Shower
            </h2>

            {/* NOMBRE DESTACADO - María Fernanda como protagonista */}
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-2 relative">
              <span className="text-muted-foreground drop-shadow-sm">
                María Fernanda
              </span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-base text-muted-foreground dark:text-muted-foreground font-light">
              <Heart className="w-4 h-4 fill-accent text-accent dark:fill-accent dark:text-accent" />
              <span>Nuestra princesa está en camino</span>
              <Heart className="w-4 h-4 fill-accent text-accent dark:fill-accent dark:text-accent" />
            </div>
          </div>          
        </div>

        <div>
          <Card className="border-2 border-primary/20 dark:border-primary/20 shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-2xl font-serif text-primary dark:text-primary">
                ¡Bienvenid@!
              </CardTitle>
              <CardDescription className="text-center text-base text-muted-foreground dark:text-muted-foreground">
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
                      "bg-secondary/30 dark:bg-secondary/10 border-input dark:border-input focus:border-primary dark:focus:border-primary transition-all duration-300 h-11",
                      nameError &&
                        "border-destructive dark:border-destructive focus:border-destructive dark:focus:border-destructive"
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
                      "bg-secondary/30 dark:bg-secondary/10 border-input dark:border-input focus:border-primary dark:focus:border-primary transition-all duration-300 h-11",
                      emailError &&
                        "border-destructive dark:border-destructive focus:border-destructive dark:focus:border-destructive"
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
                  className="w-full text-primary-foreground font-medium h-11 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
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

        <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground mt-6 font-light">
          Hecho con{" "}
          <Heart className="inline w-4 h-4 fill-primary text-primary dark:fill-primary dark:text-primary" />{" "}
          para Diana, Fernando y María Fernanda
        </p>
      </div>
    </div>
  );
}
