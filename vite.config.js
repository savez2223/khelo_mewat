import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  // 👇 Add this for Vite + client-side routing fallback on localhost (optional)
  server: {
    historyApiFallback: true,
  },
});
