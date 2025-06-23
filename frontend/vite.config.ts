// vite.config.ts
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },   // lets "@/…" work
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000"
    }
  },
});
