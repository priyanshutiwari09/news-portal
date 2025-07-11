import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // important for relative asset paths
  build: {
    outDir: "dist", // ✅ Build stays in frontend/dist
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/user": "http://localhost:5000",
      "/news": "http://localhost:5000"
    }
  }
});
