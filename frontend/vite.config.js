import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../backend/public", // Adjust if needed
  },
  server: {
    proxy: {
      "/news": "http://localhost:5000",
      "/user": "http://localhost:5000",
    },
  }
});
