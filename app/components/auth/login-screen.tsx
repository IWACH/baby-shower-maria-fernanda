"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Heart, Home, Loader2, Sparkles } from "lucide-react";
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
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm mb-6 shadow-xl"
          >
            <Home className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-serif mb-3 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground"
          >
            Baby Shower
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg font-light tracking-wide"
          >
            de María Fernanda
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>Celebrando la llegada de nuestra princesa</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-none shadow-2xl bg-card/70 backdrop-blur-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-2xl font-serif">
                ¡Bienvenid@!
              </CardTitle>
              <CardDescription className="text-center text-base">
                Ingresa tus datos para ver la lista de regalos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </Label>
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
                      "bg-background/80 border-muted focus:border-primary transition-all duration-300 h-11",
                      nameError &&
                        "border-destructive/60 focus:border-destructive/60"
                    )}
                  />
                  {nameError && (
                    <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                      {nameError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo
                  </Label>
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
                      "bg-background/80 border-muted focus:border-primary transition-all duration-300 h-11",
                      emailError &&
                        "border-destructive/60 focus:border-destructive/60"
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
                  className="w-full text-white font-medium h-11 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
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
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Hecho con{" "}
          <Heart className="inline w-4 h-4 fill-red-400 text-red-400" /> para
          Diana, Fernando y María Fernanda
        </motion.p>
      </motion.div>
    </div>
  );
}
