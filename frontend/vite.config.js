import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ very important for correct asset paths
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/user": "http://localhost:5000",
      "/news": "http://localhost:5000"
    }
  }
});
