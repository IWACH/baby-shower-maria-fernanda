"use client";

import { useRouter } from "next/navigation";

import { LoginScreen } from "@/app/components/auth/login-screen";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (name: string, email: string) => {
    // Guardar usuario en localStorage (mismo formato que usa RegistryHybrid/Header)
    const user = { name, email };
    try {
      localStorage.setItem("hs_user", JSON.stringify(user));
    } catch (e) {
      console.error("Error al guardar el usuario en localStorage", e);
    }

    // Establecer cookie simple para que el middleware sepa que está logueado
    const maxAgeSeconds = 60 * 60 * 24 * 30; // 30 días
    document.cookie = `hs_auth=1; path=/; max-age=${maxAgeSeconds}`;

    // Navegar al home
    router.replace("/");
  };

  return <LoginScreen onLogin={handleLogin} />;
}
