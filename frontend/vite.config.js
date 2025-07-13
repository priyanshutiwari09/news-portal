import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ Add Tailwind plugin here

export default defineConfig({
  plugins: [react(), tailwindcss()], // ✅ Ensure Tailwind runs properly with Vite

  base: "/", // ✅ Needed for correct path resolution on Render/static hosting

  build: {
    outDir: "dist",        // ✅ Recommended
    emptyOutDir: true      // ✅ Clean previous build output
  },

  server: {
    proxy: {
      "/user": "http://localhost:5000",
      "/news": "http://localhost:5000"
    }
  }
});
