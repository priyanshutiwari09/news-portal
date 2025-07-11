import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ this is crucial when serving from backend
  build: {
    outDir: "../backend/public", // ✅ must match what you're serving from
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/user": "http://localhost:5000",
      "/news": "http://localhost:5000"
    }
  }
});
