"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-serif mb-2 text-foreground drop-shadow-sm">
        Lista de regalos de
      </h2>
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-muted-foreground filter drop-shadow-sm">
        María Fernanda
      </h1>
      <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
        Gracias por celebrar con Diana y Fernando la llegada de María Fernanda.
        Elige un regalo para dar la bienvenida a la pequeña princesa.
      </p>
    </motion.div>
  );
}
