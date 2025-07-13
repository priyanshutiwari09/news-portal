import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Ensures correct asset paths in production

  build: {
    outDir: "dist",        // ✅ Optional, but recommended
    emptyOutDir: true      // ✅ Clean old builds before new one
  },

  server: {
    proxy: {
      "/user": "http://localhost:5000",
      "/news": "http://localhost:5000"
    }
  }
});
