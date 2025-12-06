// Versión del servidor sin animaciones (funciona sin JS)
export function HeroSectionServer() {
  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        Lista de Deseos
      </h2>
      <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
        Gracias por ser parte de este nuevo comienzo. Elige un detalle para
        hacer de este hogar un lugar más acogedor.
      </p>
    </div>
  );
}
