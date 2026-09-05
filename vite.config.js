import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Caminho relativo: funciona tanto na raiz quanto em subpastas
  // (como https://usuario.github.io/rolezeiro/ no GitHub Pages).
  base: "./",
});
